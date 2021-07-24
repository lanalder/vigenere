const mm = document.querySelector('.mouth');

const txt = '<p>i, mr. vigenere, have made you a cipher! your secrets are safe with me and my many alphabetical substitutions (provided you live between the 16th to 19th centuries) -- just confess something juicy in plain english there on the right.</p> <p>whats this? the code thats so kindly hosting me figures it can crack my cipher... blasphemy! best prove it wrong by entering some ciphertext in that same box, and if weirdly you dont have on hand pre-vigenered paragraphs, <a href="https://pages.mtu.edu/~shene/NSF-4/Tutorial/VIG/Vig-Examples.html" target="_blank">you can find some here</a></p>';

var speak = () => {
    anime({
    targets: mm,
    translateY: function() {
        return anime.random(0, 7);
      },
    easing: 'linear',
    duration: 200,
    complete: speak
  });
}

speak();

typer = new Typewriter('.instruct', {
  strings: txt,
  autoStart: true,
  delay: 20,
  cursor: ''
});
