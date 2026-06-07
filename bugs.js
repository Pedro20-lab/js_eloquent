class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {

  for(;;) {
    try {
      let value = primitiveMultiply(a, b)
      console.log('Finally worked this shitty function primitiveMultiply()')
      return value
      //break
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log("You've miserably failed")        
      }
    }
  }
  
}

console.log(reliableMultiply(8, 8));
// → 64

const box = new class {
  locked = true;
  #content = [];

  unlock() { this.locked = false; }
  lock() { this.locked = true;  }
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this.#content;
  }
};

function withBoxUnlocked(body) {
  try {
    return body()
  } catch (e) {
    console.log("Error raised: " + e);
  } finally {
    box.lock
  }
}

withBoxUnlocked(() => {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(() => {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}
console.log(box.locked);
// → true