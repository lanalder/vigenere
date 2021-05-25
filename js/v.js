const abc = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q', 'r','s','t','u','v','w','x','y','z'],
    freqTab = [8.15,1.44,2.76,3.79,13.11,2.92,1.99,5.26,6.35,0.13,0.42,3.39,2.54, 7.10,8.00,1.98,0.12,6.83,6.10,10.47,2.46,0.92,1.54,0.17,1.98,0.08],
    cii = document.querySelector('.ctext'),
    dci = document.querySelector('.dctext'),
    cb = document.querySelector('.cipherB'),
    dcb = document.querySelector('.dcipherB');

var kw = [],
    //keyword (ci)
    kwL,
    c = {og: '', min: '', ci: ''},
    dc = Object.create(c),
    ca = [],
    dca = [],
    rp = new Array(3),
    //storing all the char combos (dci)
    pt = [],
    //char patterns that repeat (dci)
    indie = {},
    //indices for char patterns (dci)
    pos = 0,
    //position in text tbciphered (ci)
    ccl = 0,
    //no. clicks (ci)
    poss = new Map(),
    //all possible factors 2 determine kw length (dci)
    nf = 0,
    //no. times factor applies (dci)
    pf;
    //probable factor ie kwl (dci)


console.log(rp);

function init(cd) {
  cd.og = (cd==c ? cii.value : dci.value);
  cd.min = cd.og.replace(/[^\w\s]|_/g," ").replace(/\s+/g," ").toLowerCase();
  cd==c ? ca = c.min.split('') : dca = dc.min.split('');
  cd==c ? ca = ca.filter(x => x!==' ') : dca = dca.filter(x => x!==' ');
  pos = 0;
}

function genKey() {
  kwL = Math.abs(Math.round(Math.random()*(3-ca.length/10)+3));
  for (let i = 0; i < kwL; i++) {
    let ranlet = Math.abs(Math.round(Math.random()*(0-25)));
    kw[i] = abc[ranlet];
  }
  console.log(kw);
  cipher();
}

function cipher() {
  for (let i = pos; i < kwL+pos; i++) {
    let keyInd = abc.findIndex(x => x == kw[i%kwL]);
    let cInd = abc.findIndex(x => x == ca[i]);
    let newLet = (keyInd+cInd)%26;
    ca[i] = abc[newLet];
  }
  pos += kwL;
  while (pos<ca.length) {
    cipher();
  }
  c.ci = ca.join('');
}

cb.addEventListener('click', function() {
  if (ccl%2) {
    cb.textContent = 'get cipherd';
    cii.value = c.og;
  } else {
    init(c);
    genKey();
    cii.value = c.ci;
    cb.textContent = 'show og';
  }
  ccl++;
});

dcb.addEventListener('click', function() {
  init(dc);
  dci.value = dca.join('');
  combos();
  // patterns();
});

function patterns() {
  let dup = {};
  for (let i=0; i<dca.length; i++) {
    rp[i] = dca[i]+dca[i+1]+dca[i+2];
    indie.thr = rp;
    // if (!indie.fur) {
      rp[i] += dca[i+3];
      indie.fur = rp;
    // } else if (!indie.fve) {
      rp[i] += dca[i+3]+dca[i+4];
      indie.fve = rp;
    // }
  }
  console.log(indie);
  // for (let i=0; i<rp.length; i++) {
  //   if(dup[rp[i]]<2 && dup[rp[i]]) {
  //     //so that doesn't repush repeats > 2, not a massive thing since objs skip properties alr defined? i think, but idk good 2 sort out ig
  //     dup[rp[i]]++;
  //     pt.push(rp[i]);
  //   } else {
  //     dup[rp[i]] = true;
  //   }
  // }
  // gaps();
}

function combos(id) {
  rp.forEach(function(x){x=new Array('')});
  console.log(rp[0]);
  for (let i=0; i<dca.length; i++) {
    rp[0][i] = dca[i]+dca[i+1]+dca[+2];
    rp[1][i] = rp[0][i]+dca[i+3];
    rp[2][i] = rp[1][i]+dca[i+4];
  }
  rp[0].slice(0, -2);
  rp[1].slice(0, -3);
  rp[2].slice(0, -4);
  console.log(rp);
}

function cleanup(id) {
  return id==indie.thr ? indie.thr.slice(0, -2)
         : id==indie.fur ? indie.fur.slice(0, -3)
         : indie.fve.slice(0, -4);
}

function gaps() {
  for (let i=0; i<pt.length; i++) {
    let m = 0;
    indie[pt[i]] = [rp.findIndex(x => x==pt[i])];
    let end = false;
    while (!end) {
      m++;
      let nxt = rp.slice(indie[pt[i]][m-1]+1, -1);
      indie[pt[i]][m] = nxt.findIndex(x => x==pt[i]);
      end = indie[pt[i]].includes(-1);
      indie[pt[i]][m] += indie[pt[i]][m-1]+1;
    }
    indie[pt[i]].splice(-1, 1);
    //a mystery as 2 why this' needed... otherwise pushes the last repeat index twice...
  }
  fact();
}

function fact() {
  //first init factor possibilities
  for (let i=3; i<dca.length/10; i++) {
    poss.set(i, nf);
  }
  for (let i=0; i<pt.length; i++) {
    let g = Object.values(indie[pt[i]]);
    for (let p=0; p<g.length; p++) {
      //for all the repeats in a specific pattern
      if (!(indie[pt[i]][g.length]-indie[pt[i]][g-1])%i) {
        poss.set(i, nf++);
      }
    }
    nf = 0;
  }
  console.log(indie, poss);
  pf = Math.max(...poss.values());
  //spread makes arr of just map vals (spread thing seems 2 only work in funcs/methods to note)
  if (pf===1) {
    //ie hasnt found a more common factor than any other, ie. need 2 recurse back to patterns with bigger char pattern
  } else {
    tableTime();
  }
}

function tableTime() {
  pf++;
  let each = new Array(Math.floor(dca.length/pf));
  let kwKeys = new Array(pf, each, each, each);
      n=0;
  // kwKeys.forEach(function(el){el = new Array(Math.floor(dca.length/pf))});
  console.log(kwKeys);
  for (let k=0; k<pf; k++) {
    // kwKeys[k] = new Array(Math.floor(dca.length/pf));
    for (let l=k; l<dca.length-pf-k; l+=pf) {
      kwKeys[k][n] = dca[l];
      n++;
    }
  }
  console.log(kwKeys);
}

//since fact finds smallest factors first, if tableTime is unsuccesful try multiples (is that the right term??) of pf
// function tableTime() {
//   pf++;
//   //startin at 0 thing means rn factor seems tb 1 off actual kwl. mystery tb solved later ig as to where exactly this is coming from... big issue in terms of dividing things? we will see... is it mayb the dist not counting included chars?
//   let kwKeys = new Map(),
//       row = kwKeys.values();
//   for (let k=0; k<pf; k++) {
//     kwKeys.set(k, new Array(Math.floor(dca.length/pf)));
//     let n = 0;
//     console.log(k, dca[k], row);
//     for (let l=k; l<dca.length-pf-k; l+=pf) {
//       row[n] = dca[l];
//       row = Array.from(row);
//       kwKeys.set(k, row);
//       n++;
//     }
//   }
//   console.log(kwKeys, row);
// }
