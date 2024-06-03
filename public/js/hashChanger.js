const hashChangeTriggers = document.querySelectorAll('[data-hash]');

console.log("hashChangeTriggers", hashChangeTriggers);
hashChangeTriggers.forEach(trigger => {
  // when element reaches the top of the viewport, change the hash
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        location.hash = trigger.dataset.hash;
        console.log("location.hash", location.hash);
      }
    });
  });

  observer.observe(trigger);
});
console.log("hashChangeTriggers", hashChangeTriggers);