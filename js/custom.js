const btn = document.querySelector('.btn'),
  showkey = document.querySelector('.tellkw'),
  inp = document.querySelector('.inp');

let kwl = 0,
  // ^ keyword length, below plaintext ran-gend kwl
  ptkwl = [],
  table = [],
  // v holds text
  v;

let omni = {
  abc: [],
  // english letter freqs
  eng: [8.15, 1.44, 2.76, 3.79, 13.11, 2.92, 1.99, 5.26, 6.35, 0.13, 0.42, 3.39, 2.54, 7.10, 8.00, 1.98, 0.12, 6.83, 6.10, 10.47, 2.46, 0.92, 1.54, 0.17, 1.98, 0.08],

  abcInit() {
    // lazy way 2 get the alphabet
    for (let i = 97; i < 123; i++) {
      this.abc[i - 97] = String.fromCharCode(i);
    }
  },

  sum(arr) {
    return arr.reduce((acc, val) => acc + val, 0); },

  uniquify(arr) {
    return Array.from(new Set(arr)); }
};

let patterns = {
  factors: [],

  shifts(sectSize) {
    let offSect = [];

    for (let sh = 0; sh < sectSize; sh++) {

      for (let i = 0; i < v.length / sectSize; i++) {
        offSect.push(v.substring(i * sectSize + sh, i * sectSize + sectSize + sh));
        // intentionally not i * (sectSize * 2) in second half, ig bedmas can prove useful?? this way spaced out evenly so that substring taken from one end of sectSize to the other, + sh to account for offset from start, vs. exponentially jumping greater & greater distances between substrings
      }
    }

    return offSect;
  },

  factor(arrDist) {

    // find factors of all distances between rps
    for (let i = 0; i < arrDist.length; i++) {

      // start from 3 since 2 is cluttering and unlikely kwl
      let dividing = 3;
      let handful = [];

      // for sake of performance will assume kwl < 25
      while (dividing < 20) {

        // if not a factor or alr been found, increase dividing number
        if (arrDist[i] % dividing || dividing === handful[handful.length - 1]) {
          dividing += 1;
        } else {
          handful.push(dividing);
          // again for performance, only test first 3 factors
          if (handful.length > 3) {
            dividing = 20;
          }
        }
      }

      // if no factors < 25 are found, can assume kwl might be just that distance
      if (!handful.length && arrDist[i] < 100) {
        handful = [arrDist[i]];
      }

      this.factors.push(...handful);
      // store found factors n delete duplicates in uniquify
      this.factors = omni.uniquify(this.factors);
    }
  },

  repeats(sectSize) {
    // finds repeating patterns of sectSize-length (parameter from keycutter() loop between 3-6), sets holds text in sectSize chunks
    let sets = this.shifts(sectSize);
    // gaps 2d so 0 can hold actual ind of pattern in v, while 1 = dist between rps
    let gaps = [[], []];
    let occr = [];

    sets.forEach((morsel) => {
      let rp = sets.filter(others => others === morsel);
      // rp & filter lets us know if pattern repeats

      if (rp.length > 1 && !occr.includes(morsel)) {
        // occr just there so a repeating pattern's indices is pushed only once & not every time it shows up
        occr.push(morsel);
        gaps[0].push(v.indexOf(morsel));

        // for as many times as pattern repeats (as found by rp filter) gaps[0] gets index of v so that the dist between rps can be taken n stored in gaps[1]
        for (let i = 0; i < rp.length - 1; i++) {
          gaps[0].push(v.indexOf(morsel, gaps[0][gaps[0].length - 1] + 1));
          gaps[1].push(gaps[0][i + 1] - gaps[0][i]);
        }

        gaps[0] = [];
      }
    });

    gaps[1] = omni.uniquify(gaps[1]);
    this.factor(gaps[1]);
  }
};

let freqkey = {
  ic: [[], []],
  // holds ic calcs for each letter
  formIC: set26(),
  chi: [],

  calcIC(text) {
    // this & below method r seperate since 2 determine if user input is plaintext or ciphered will deal with full v text or table coset respectively (arg must be array)
    let occr = set26();

    // count each letter's occurance (occr ind = letter)
    text.forEach((lett) => {
      occr[omni.abc.indexOf(lett)] += 1;
    });

    // ic formula
    occr.forEach((count, lett) => {
      let len = text.length;
      this.formIC[lett] += (count / len) * ((count - 1) / (len - 1));
    });
  },

  deICpher() {
    // for deciphering only, since here IC of full text is useless it's the cosets that matter
    this.formIC = set26();

    // hence calc IC for each coset individually
    for (let i = 0; i < kwl; i++) {
      this.calcIC(table[i]);
    }

    this.ic[0].push(kwl);
    this.ic[1].push(omni.sum(this.formIC) / kwl);
  },

  chiron() {
    for (let i = 0; i < kwl; i++) {
      let chi = set26();

      chi = chi.map((abcSub, subAmt) => {
        let formul = [];

        let subbed = table[i].map((ele) => {
          let og = omni.abc.indexOf(ele);
          return omni.abc[Math.abs(26 + (og - subAmt)) % 26];
        });

        subbed.forEach((ele) => {
          let letpos = omni.abc.indexOf(ele);
          let occr = subbed.filter(x => x === ele);
          let calcs = Math.pow((occr.length / 10) - (omni.eng[letpos] / 100), 2);
          calcs = calcs / (omni.eng[letpos] / 100);

          formul.push(calcs);
          subbed = subbed.filter(x => x !== ele);
        });

        return omni.sum(formul);
      });

      this.chi[i] = chi.indexOf(Math.min(...chi));
    }
  }
};

function keycutter() {
  // find common factors 2 narrow down plausible kwl
  for (let i = 3; i < 7; i++) {
    patterns.repeats(i);
  }

  // for kwl possibilities, find incident coincident thing (best fitting letter freq distribution compared 2 english (0.03: no way; 0.06: sensible language))
  for (let i = 0; i < patterns.factors.length; i++) {
    kwl = patterns.factors[i];
    matrix();
    freqkey.deICpher();
    table = [];
  }

  // kwl = biggest IC
  let biggestIC = Math.max(...freqkey.ic[1]);
  kwl = freqkey.ic[0][freqkey.ic[1].indexOf(biggestIC)];

  // get new table of kwl cosets, calc chi2
  matrix();
  freqkey.chiron();

  // sub in proper letters
  solve();
}

function matrix() {
  // unlikely that text will nicely divide into kwl
  let overflow = v.length % kwl;

  for (let i = 0; i < kwl; i++) {
    // table organised into rows of cosets
    table[i] = [];

    for (let j = 1; j < v.length / kwl; j++) {
      // not starting at 0 since j isn't used for arr index (and * 0 is problematic here), rather what kw letter each text letter lines up with
      table[i].push(v[j * kwl - (kwl - i)]);
      // j * kwl = relevant fraction of text (as human readable row, not coset), minus kwl - 1 = kw letter, = pos in text & kw
    }

    if (overflow) {
      // first few cosets will be longer on account of tail-end remainder
      table[i].push(v[v.length - overflow]);
      overflow -= 1;
    }
  }
}

function solve() {
  let unciphd = new Array(v.length);

  for (let i = 0; i < kwl; i++) {

    // subbing in the de/ciphered letters
    table[i] = table[i].map((x, ind) => {
      let og = omni.abc.indexOf(x);

      // if there are vals in .chi, decipher rather than cipher; deciphering moves the alphabet left while cipher goes right
      return (freqkey.chi.length
        ? omni.abc[Math.abs(26 + (og - freqkey.chi[i])) % 26]
        : omni.abc[(og + ptkwl[i]) % 26]);
    });

    // table has rows of cosets, while new text needs to be ordered according to columns; second ind (ind of coset rows) of table is that many kwls away from 0, then + i for offset from start of kw
    table[i].forEach((x, ind) => {
      unciphd[kwl * ind + i] = x;
    });
  }

  inp.value = unciphd.join(' ');
}

function set26() {
  // ind = letter, for counting occurances etc.
  let arr = new Array(26);
  for (let i = 0; i < 26; i++) {
    arr[i] = 0;
  }
  return arr;
}

// dom + ciphering stuff

btn.addEventListener('click', function() {
  showkey.textContent = '';
  omni.abcInit();

  if (inp.value !== "") {
    v = inp.value;
    v = v.replace(/[^\w\s]|_/g, " ").replace(/\s+/g, "").toLowerCase();

    if (v.length < 20) {
      alert('reversing the cipher of text this short will probably just make a mess -- im not a wizard sadly but even if i were, id be hungry for a longer sample size thanks! <|:o)');
    }

    freqkey.calcIC(Array.from(v));
    // can tell if user entered plaintext or ciphered from IC
    if (omni.sum(freqkey.formIC) < 0.055) {
      keycutter();
      revealKW();
    } else {
      ciphed();
    }
  }
  reset();
}, false);

function ciphed() {
  for (let i = 0; i < Math.round(Math.random() * (12 - 5) + 5); i++) {
    ptkwl[i] = Math.round(Math.random() * 25);
  }

  kwl = ptkwl.length;
  matrix();
  solve();
  revealKW();
}

function revealKW() {
  let rkw = '';

  if (ptkwl.length) {
    ptkwl.forEach((x) => { rkw += omni.abc[x]; });
  } else {
    freqkey.chi.forEach((x) => { rkw += omni.abc[x]; });
  }

  showkey.textContent = rkw;
}

function reset() {
  kwl = 0;
  ptkwl = [];
  table = [];
  v = ' ';
  patterns.factors = [];
  freqkey.ic = [[], []];
  freqkey.formIC = set26();
  freqkey.chi = [];
}
