
let v = 'DAZFI SFSPA VQLSN PXYSZ WXALC DAFGQ UISMT PHZGA MKTTF TCCFXKFCRG GLPFE TZMMM ZOZDE ADWVZ WMWKV GQSOH QSVHP WFKLS LEASEPWHMJ EGKPU RVSXJ XVBWV POSDE TEQTX OBZIK WCXLW NUOVJ MJCLLOEOFA ZENVM JILOW ZEKAZ EJAQD ILSWW ESGUG KTZGQ ZVRMN WTQSEOTKTK PBSTA MQVER MJEGL JQRTL GFJYG SPTZP GTACM OECBX SESCIYGUFP KVILL TWDKS ZODFW FWEAA PQTFS TQIRG MPMEL RYELH QSVWBAWMOS DELHM UZGPG YEKZU KWTAM ZJMLS EVJQT GLAWV OVVXH KWQILIEUYS ZWXAH HUSZO GMUZQ CIMVZ UVWIF JJHPW VXFSE TZEDF';

let kwl = 0,
  table = [];

let freqkey = {
  abc: [],
  eng: [8.15, 1.44, 2.76, 3.79, 13.11, 2.92, 1.99, 5.26, 6.35, 0.13, 0.42, 3.39, 2.54, 7.10, 8.00, 1.98, 0.12, 6.83, 6.10, 10.47, 2.46, 0.92, 1.54, 0.17, 1.98, 0.08],
  ic: [],
  allIC: [],
  chi: [],
  bigBoyIC: null,

  icCalc(ind) {
    let charCol = table[ind];
    let occr = new Array(26);
    // this.ic = new Array(26);
    // init abc the lazy way
    for (let i = 97; i < 123; i++) {
      this.abc[i - 97] = String.fromCharCode(i);
      occr[i - 97] = 0;
      this.ic[i - 97] = 0;
    }
    charCol.forEach((x) => {
      let l = this.abc.indexOf(x);
      occr[l] += 1;
    });
    occr.forEach((x) => {
      let form = (x / charCol.length) * ((x - 1) / (charCol.length - 1));
      this.ic[occr.indexOf(x)] = form;
    });
    // console.log(this.ic);
    let sum = 0;
    this.ic.forEach((x) => {
      sum += x;
    });
    // this.allIC.push(sum);
    return sum;
  }
};

function keycutter() {
  v = v.replace(/[^\w\s]|_/g, " ").replace(/\s+/g, "").toLowerCase();
  // replace all weird things w spaces, replace all spaces w no space (meandering essay on this at bottom)
  for (let i = 10; i < 14; i++) {
    kwl = i;
    reset();
    matrix();
  }
}

function matrix() {
  let sect = [];
  let allIC = [];
  for (let i = 0; i < v.length / kwl; i++) {
    sect.push(v.substring(i * kwl, i * kwl + kwl));
  }
  for (let i = 0; i < kwl; i++) {
    sect.forEach((x) => {
      table[i].push(x[i]);
    });
    table[i].sort();
    allIC[i] = freqkey.icCalc(i);
  }
}

function reset() {
  // freqkey.ic = new Array(26);
  for (let i = 0; i < kwl; i++) {
    table[i] = [];
  }

}


let m = [];
// let kwl = 0;
// let table = [];
// pos in table = column
let stats = [];
let comp = [];
let f = new Map();
// map used since quick 2 only insert letters once, but if arr ind = letter could be better when u have energy 2 redo, map methods kinda suck
let ciphFreq = [];

keycutter();

//
// function keycutter() {
//   v = v.replace(/[^\w\s]|_/g, " ").replace(/\s+/g, "").toLowerCase();
//
//   // for (let i = 4; i < v.length / 2; i++) {
//   for (let i = 10; i < 20 ; i++) {
//     // 4 is just since who would have a key < 4 chrs long, but!!! do not forget!! that the index of comp for kwl is now 4 off :)
//     kwl = i;
//     reset();
//     // clearing vals once ic found 4 that kwl, then calling matrix 2 repeat process
//     matrix();
//   }
//
//   let b = [comp[0], 0];
//   // 0 the (greatest) ic val, 1 the index (hence +4, note this the only time offset accounted 4) ie. the highest multiple of probable kwl (0 isn't rly needed, yet)
//   comp.forEach((x) => {
//     if (x > b[0]) {
//       // b = [x, comp.indexOf(x) + 4];
//       b = [x, comp.indexOf(x) + 10];
//     }
//   });
//   // console.log(comp, b);
//   chi(b);
// }

// function matrix() {
//   let ori = arguments.callee.caller.toString().substring(9, 10);
//   // an argument would no doubt b better but it's fun 2 experiment
//
//   for (let i = 0; i < v.length / kwl; i++) {
//   // sorts v into sections of kwl (m arr sep'd by kwl)
//     m.push(v.substring(i * kwl, i * kwl + kwl));
//   }
//
//   for (let i = 0; i < kwl; i++) {
//   // now each nth char of kw is n index of table
//     m.forEach((x) => {
//       table[i].push(x[i]);
//     });
//     table[i].sort();
//     count(i);
//     if (ori === 'c') {
//       ciphFreq[i] = [Array.from(f.keys()), Array.from(f.values())];
//       // ye map should def b changed 2 arr, tho this way the kw-shifts are repped already by ciphFreq index, so that's handy
//     }
//   }
//   let sum = 0;
//   stats.forEach((x) => {
//     sum += x;
//   });
//   comp.push(sum);
// }

function count(ind) {
  let row = table[ind];
  // row actually confusingly column as usually thought ab in human approach, ie. each shift, but table index determining kw shift sooo ig it's a row now
  f = new Map();
  row.forEach((x) => {
    if (x !== undefined) {
      // ciphertext prolly not a neat multiple of kwl, end might b nothing but don't want that in calcs
      f.set(x, 1);
      // 1 since if set it appears at least once
    }
  });
  for (let i = 0; i < row.length - 1; i++) {
    if (row[i] === row[i + 1]) {
      let inc = f.get(row[i]);
      f.set(row[i], inc += 1);
    }
  }
  Array.from(f.values()).forEach((x) => {
    // stats thing not chi the other one omg WHAT is it called
    let chr = (x / row.length) * ((x - 1) / (row.length - 1));
    stats[ind].push(chr);
  });
  let sum = 0;
  stats[ind].forEach((x) => {
    sum += x;
  });
  stats[ind] = sum * row.length;
}

function chi(kw) {
  kwl = kw[1];
  for (let i = 0; i < kwl; i++) {
    ciphFreq.push([]);
  }
  reset();
  matrix();
  stats = [];
  for (let i = 0; i < kwl; i++) {
    let l = 0;
    let relsum = 0;
    ciphFreq[i][1].forEach((x) => {
      relsum += x;
    });
    for (let j = 0; j < ciphFreq[i][1].length - 1; j++) {
      stats[j] = abc[0].indexOf(ciphFreq[i][0][j]);
    }




    // not just in for loop above since relsum needs to b, well, the sum (it's absolutely an artistic choice n not just laziness 2 keep digging the hole of short-sighted array structures)
    // for (let j = 0; j < ciphFreq[i][1].length - 1; j++) {
      // getting a relative occurance rather than no. actual instances
      // ciphFreq[i][1][j] = (ciphFreq[i][1][j] / 100) * relsum;
    //   l = abc.indexOf(ciphFreq[i][0][j]);
    //   if (l !== -1) {
    //     let fo = ciphFreq[i][1][j];
    //     let fe = (freqTab[l] / 100) * relsum;
    //     let squid = Math.pow((fo - fe), 2);
    //     let x2 = squid / fe;
    //     ciphFreq[i][1][j] = x2;
    //     // console.log(x2, abc[l]);
    //   }
    // }
  }
  console.log(ciphFreq, stats);
}
//
// function reset() {
//   table = [];
//   stats = [];
//   m = [];
//   // comp = [];
//   f = new Map();
//   for (let i = 0; i < kwl; i++) {
//     table[i] = [];
//     stats[i] = [];
//   }
// }

// keycutter();

// for future ref: \w any alphanumeric char, \s any sorta space char, the ^ in front of em is anything not in those 2 sets (but if it was just b4 w or s n not the set would only search 4 first instance), g meaning global matches all instances, the | is 'or' ig bc _ isn't included in \w or \s (acc one site said w did include it? idk i'll trust stack o). as 4 slashes, rabbithole time: in reg exp obvs these letters have a new meaning 4 the compiler, their 'special' meaning, n aren't just a literal w, but what makes w special is the forwardslash -- w/o it would only search for 'w's n not any (latin) alphanumeric char (forwardslash is the literal obj constructor 4 reg exp), what im now confuddled ab is the backslash, which apparently reverts back 2 literal treatment... but i think only for special chars? \w is just the shortcut 4 [0-z], n so either \ here a signal 2 stop searching n treat that char literally as part of range (i.e. replace it) or just a silly reuse of \, as meaning sometimes to treat something literally, for some things meaning also to treat specially. idk
