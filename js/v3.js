// let v = 'DAZFI SFSPA VQLSN PXYSZ WXALC DAFGQ UISMT PHZGA MKTTF TCCFXKFCRG GLPFE TZMMM ZOZDE ADWVZ WMWKV GQSOH QSVHP WFKLS LEASEPWHMJ EGKPU RVSXJ XVBWV POSDE TEQTX OBZIK WCXLW NUOVJ MJCLLOEOFA ZENVM JILOW ZEKAZ EJAQD ILSWW ESGUG KTZGQ ZVRMN WTQSEOTKTK PBSTA MQVER MJEGL JQRTL GFJYG SPTZP GTACM OECBX SESCIYGUFP KVILL TWDKS ZODFW FWEAA PQTFS TQIRG MPMEL RYELH QSVWBAWMOS DELHM UZGPG YEKZU KWTAM ZJMLS EVJQT GLAWV OVVXH KWQILIEUYS ZWXAH HUSZO GMUZQ CIMVZ UVWIF JJHPW VXFSE TZEDF';

let v = 'TYWUR USHPO SLJNQ AYJLI FTMJY YZFPV EUZTS GAHTU WNSFW EEEVAMYFFD CZTMJ WSQEJ VWXTU QNANT MTIAW AOOJS HPPIN TYDDM VKQUFLGMLB XIXJU BQWXJ YQZJZ YMMZH DMFNQ VIAYE FLVZI ZQCSS AEEXVSFRDS DLBQT YDTFQ NIVKU ZPJFJ HUSLK LUBQV JULAB XYWCD IEOWHFTMXZ MMZHC AATFX YWGMF XYWZU QVPYF AIAFJ GEQCV KNATE MWGKXSMWNA NIUSH PFSRJ CEQEE VJXGG BLBQI MEYMR DSDHU UZXVV VGFXVJZXUI JLIRM RKZYY ASETY MYWWJ IYTMJ KFQQT ZFAQK IJFIP FSYAGQXZVK UZPHF ZCYOS LJNQE MVK';

// let v = 'VVQGY TVVVK ALURW FHQAC MMVLE HUCAT WFHHI PLXHV UWSCI GINCMUHNHQ RMSUI MHWZO DXTNA EKVVQ GYTVV QPHXI NWCAB ASYYM TKSZRCXWRP RFWYH XYGFI PSBWK QAMZY BXJQQ ABJEM TCHQS NAEKV VQGYTVVPCA QPBSL URQUC VMVPQ UTMML VHWDH NFIKJ CPXMY EIOCD TXBJWKQGAN';

// let v = 'QRBAI UWYOK ILBRZ XTUWL EGXSN VDXWR XMHXY FCGMW WWSME LSXUZMKMFS BNZIF YEIEG RFZRX WKUFA XQEDX DTTHY NTBRJ LHTAI KOCZXQHBND ZIGZG PXARJ EDYSJ NUMKI FLBTN HWISW NVLFM EGXAI AAWSLFMHXR SGRIG HEQTU MLGLV BRSIL AEZSG XCMHT OWHFM LWMRK HPRFBELWGF RUGPB HNBEM KBNVW HHUEA KILBN BMLHK XUGML YQKHP RFBELEJYNV WSIJB GAXGO TPMXR TXFKI WUALB RGWIE GHWHG AMEWW LTAELNUMRE UWTBL SDPRL YVRET LEEDF ROBEQ UXTHX ZYOZB XLKAC KSOHNVWXKS MAEPH IYQMM FSECH RFYPB BSQTX TPIWH GPXQD FWTAI KNNBXSIYKE TXTLV BTMQA LAGHG OTPMX RTXTH XSFYG WMVKH LOIVU ALMLDLTSYV WYNVW MQVXP XRVYA BLXDL XSMLW SUIOI IMELI SOYEB HPHNRWTVUI AKEYG WIETG WWBVM VDUMA EPAUA KXWHK MAUPA MUKHQ PWKCXEFXGW WSDDE OMLWL NKMWD FWTAM FAFEA MFZBN WIHYA LXRWK MAMIKGNGHJ UAZHM HGUAL YSULA ELYHJ BZMSI LAILH WWYIK EWAHN PMLBNNBVPJ XLBEF WRWGX KWIRH XWWGQ HRRXW IOMFY CZHZL VXNVI OYZCMYDDEY IPWXT MMSHS VHHXZ YEWNV OAOEL SMLSW KXXFX STRVI HZLEFJXDAS FIE';

let kwl = 0,
  table = [];

let omni = {
  abc: [],
  eng: [8.15, 1.44, 2.76, 3.79, 13.11, 2.92, 1.99, 5.26, 6.35, 0.13, 0.42, 3.39, 2.54, 7.10, 8.00, 1.98, 0.12, 6.83, 6.10, 10.47, 2.46, 0.92, 1.54, 0.17, 1.98, 0.08],
  // eng: [0.082, 0.014, 0.028, 0.038, 0.131, 0.029, 0.020, 0.053, 0.064, 0.001, 0.004, 0.034, 0.025, 0.071, 0.080, 0.020, 0.001, 0.068, 0.061, 0.105, 0.025, 0.009, 0.015, 0.002, 0.020, 0.01],
  // ciphertxt
  ct: null,

  abcInit() {
    for (let i = 97; i < 123; i++) {
      this.abc[i - 97] = String.fromCharCode(i);
    }
  }
};

let patterns = {
  allF: [],
  factors: [[], []],

  shifts(setSize) {
    // chronologically 1.2, creates sets of length = setSize, returning each set of sets before shifting along 1 until setSize and returning that etc, since pattern repeats aren't gonna adhere to sets always sectioned from 0
    let a = [];
    let p = 0;

    for (let sh = 0; sh < setSize; sh++) {
      // 1st loop for shifting start of set (better data if not just sets of 3 from 0 taken but 3 from 1 etc), 2nd sets those sets in2 sets :O + p is inc to determine start, i is pos in sets
      for (let i = 0; i < v.length / setSize - 1; i++) {
        a.push(v.substring(i * setSize + p, i * setSize + setSize + p));
      }
      p++;
    }
    return a;
  },

  countRPs(set) {
    // chronologically 1.3, finds n counts repeats
    let occr = [];
    let no = new Map();

    set.forEach((x) => {
      let i = set.indexOf(x);
      // rp patterns go into occr as many times as they occur, Map so each pattern count can b counted / only set once (i feel like there was a way 2 do this w arrs?? but i read it n then forgot it??)o:
      if (set.indexOf(x, i + 1) !== -1) {
        occr.push(x);
        no.set(x, 0);
      }
    });

    occr.sort();
    // sort (default 2 alphabetically) so can just compare neighbours
    for (let i = 0; i < occr.length; i++) {

      if (occr[i] === occr[i + 1]) {
        let c = no.get(occr[i]);
        no.set(occr[i], c + 1);
      }
    }
    return no;
  },

  findRPs(setSize) {
    // chronologically, no.1; finds repeating patterns of lengths 3, 4, 5, 6 (length determined by setSize, which is determined by loop in keycutter)
    let sets = this.shifts(setSize);
    let gaps = [];

    Array.from(this.countRPs(sets).keys()).forEach((x) => {
      gaps.push(v.indexOf(x));
      // push ind of rp set, n from that ind of sets (last ele of gaps from above, -1) push next (+1) ind of same rp until no more tb found
      while (v.indexOf(x, gaps[gaps.length - 1] + 1) !== -1) {
        gaps.push(v.indexOf(x, gaps[gaps.length - 1] + 1));
      }
    });

    let m = Array.from(this.countRPs(sets).values());
    // finds not the indices of repeats but the dist between them
    for (let i = 0; i < gaps.length; i++) {

      for (let j = 0; j < m[i]; j++) {
        gaps[i + j] = gaps[i + j + 1] - gaps[i + j];
        gaps.splice(i + j + 1, 1);
      }
    }

    for (let i = 0; i < gaps.length; i++) {
      factor(gaps[i]);
    }

    // counts n stores factors that occur enough (more than once lol still keeping options open at this point) 2 b plausible
    this.allF = this.allF.flat();
    this.allF.forEach((x) => {
      let occr = this.allF.filter(y => y === x);

      if (!this.factors[0].includes(x) && occr.length > 1) {
        this.factors[0].push(x);
        this.factors[1].push(occr.length);
      }
    });
    this.allF = [];
  }
};

function factor(x) {
  // chronologically 1.4, having found rp patterns find common factors of dist between them
  let dv = 3;

  let few = [];

  while (dv < 20) {
    // if (x % dv || dv === x / 2 || dv === few[few.length - 1]) {
    if (x % dv || dv === few[few.length - 1]) {
      dv += 1;
    } else {
      few.push(dv);
      if (few.length > 3) {
        dv = 20;
      }
    }
  }
  if (!few.length) {
    few = [x];
  }
  patterns.allF.push(few);
}

let freqkey = {
  ic: [[], []],
  chi: [],
  bigBoyIC: [0, 0, 0],

  calcIC() {
    // chronologically 2.1, for each coset count how many times each letter shows up, then do the formula thing, sum, push
    let form = set26();

    for (let i = 0; i < table.length - 1; i++) {
      // whether or not data needs 2 b taken from every coset or just the 1st idk, p marginal difference either way but for now comps r too speedy 2 warrant sacrificing that extra data for performance
      let occr = set26();
      // counting letter rps
      for (let j = 0; j < table[i].length - 1; j++) {
        occr[omni.abc.indexOf(table[i][j])] += 1;
      }
      // formula for IC (kwl = coset (text sample) length)
      occr.forEach((x, i) => {
        form[i] += ((x / kwl) * (x - 1) / (kwl - 1));
      });
    }

    let icsum = 0;
    form.forEach((x) => {
      icsum += x;
    });

    this.ic[0].push(kwl);
    this.ic[1].push((icsum * 26) / (v.length / kwl));
  },

  chiSqd() {
    let set = [];
    // fixing bad arr structure from b4 n cloning it so og ciphertxt remains; now ind1 of set = coset and ind2 = kw letter
    for (let i = 0; i < kwl; i++) {
      set[i] = [];
      for (let j = 0; j < kwl; j++) {
        set[i].push(table[j][i]);
      }
      set[i] = this.shifty(set[i]);
    }
  },

  shifty(s) {
    let chi = [];
    let fe = [];

    for (let i = 0; i < 26; i++) {
      chi.push(0);

      s.forEach((x) => {
        let occr = s.filter(y => y === x);
        let l = omni.abc.indexOf(x);

        let diff = (occr.length / 10) - (omni.eng[l] / 100);
        let squid = Math.pow(diff, 2);
        // fe.push(squid / (omni.eng[l] + occr.length / 10));
        fe.push(squid / omni.eng[l]);
      });

      let xsum = 0;
      fe.forEach((x) => {
        xsum += x;
      });
      chi[i] = xsum;
      fe = [];

      s = s.map((x) => {
        let og = omni.abc.indexOf(x);
        return omni.abc[Math.abs((og - 1) % 26)];
      });
    }
    let tn = Array.from(chi);
    tn.sort((a, b) => {
      return a > b ? 1 : 0;
    });
    tn = tn.splice(0, 8);
    for (let i = 0; i < 8; i++) {
      tn[i] = chi.indexOf(tn[i]);
    }
    return tn;
  }
};

function keycutter() {
  v = v.replace(/[^\w\s]|_/g, " ").replace(/\s+/g, "").toLowerCase();
  omni.abcInit();
  // 1. factors of kwl
  for (let i = 3; i < 7; i++) {
    patterns.findRPs(i);
  }
  // 2. set kwl 2 plausible options, ie. common factors (factors aren't enough to determine kwl as factors can b factors of each other yk); matrix having made table of kwl cosets begins finding incident coincident whatsit called the probability of 2 same letters being picked at random, which in coherent eng text is 0.06something whilst in gibbledegook more like 0.03 (if ciphertext on that assumed kwl has similar letter distribution / repeats to normal english (ie. bigger is better) then that kwl is probably the go)
  for (let i = 0; i < patterns.factors[0].length; i++) {
    kwl = patterns.factors[0][i];
    matrix();
    table = [];
  }
  // 2.1 find biggest ICs n in it is kwl (hopefully)!
  freqkey.ic[1].forEach((x, i) => {
    if (x > freqkey.bigBoyIC[2] || patterns.factors[1][i] >= freqkey.bigBoyIC[1]) {
      freqkey.bigBoyIC = [freqkey.ic[0][i], patterns.factors[1][i], x];
      // factor, occr count, ic
    }
  });
  console.log(freqkey.bigBoyIC, freqkey.ic, patterns.factors);
  kwl = freqkey.bigBoyIC[0][0];
  matrix();
  freqkey.chiSqd();
}

function matrix() {
  // chronologically 2.0, sets up a nice table of cosets at assumed kwl
  for (let i = 0; i < v.length / kwl; i++) {
  // for (let i = 0; i < kwl; i++) {

    table[i] = Array.from(v.substring(i * kwl, i * kwl + kwl));
    // for (let j = 0; j < kwl; j++) {
    //   let og = omni.abc.indexOf(table[i][j]);
    //   table[i][j] = omni.abc[(og + kwl) % 26];
    // }
  }
  // condition so that having found probable kwl, new table can b made for that without repeating IC process
  if (!freqkey.bigBoyIC[0]) {
    freqkey.calcIC();
  }
}

function set26() {
  // this needs 2 b done a lot, init arrays with 26 zeroes 2 stand for whatever number relevant to whatever index, where ind represents a letter
  let arr = new Array(26);
  for (let i = 0; i < 26; i++) {
    arr[i] = 0;
  }
  return arr;
}

keycutter();
