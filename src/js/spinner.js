class Calc {
  static rand(min, max, ease) {
    if(max === undefined) {
      max = min;
      min = 0;
    }
    let random = Math.random();
    if(ease) {
      random = ease(Math.random(), 0, 1, 1);
    }
    return random * (max - min) + min;
  }
  static randInt(min, max, ease) {
    if(max === undefined) {
      max = min;
      min = 0;
    }
    let random = Math.random();
    if(ease) {
      random = ease(Math.random(), 0, 1, 1);
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static randArr(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static map(val, inputMin, inputMax, outputMin, outputMax) {
    return ((outputMax - outputMin) * ((val - inputMin) / (inputMax - inputMin))) + outputMin;
  }

  static clamp(val, min, max) {
    return Math.max(Math.min(val, max), min);
  }

  static roundToUpperInterval(value, interval) {
    if(value % interval === 0) {
      value += 0.0001;
    }
    return Math.ceil(value / interval) * interval;
  }

  static roundToLowerInterval(value, interval) {
    if(value % interval === 0) {
      value -= 0.0001;
    }
    return Math.floor(value / interval) * interval;
  }

  static roundToNearestInterval(value, interval) {
    return Math.round(value / interval) * interval;
  }

  static intersectSphere(a, b) {
    let distance = Math.sqrt(
        (a.x - b.x) * (a.x - b.x) +
        (a.y - b.y) * (a.y - b.y) +
        (a.z - b.z) * (a.z - b.z)
    );
    return distance < (a.radius + b.radius);
  }

  static getIndexFromCoords(x, y, w) {
    return x + (y * w);
  }

  static getCoordsFromIndex(i, w) {
    return {
      x: i % w,
      y: Math.floor(i / w)
    }
  }

}

let spinner = {
  wrap: document.querySelector(".spinner-wrap"),
  left: document.querySelector(".spinner-left-inner"),
  right: document.querySelector(".spinner-right-inner"),
  prog: 0,
  prog_right: 0,
  start_right: (Math.PI / 4) * 5,
  end_right: (Math.PI / 4) * 5 + Math.PI,
  prog_left: 0,
  start_left: (Math.PI / 4),
  end_left: (Math.PI / 4) + Math.PI
};

function loop() {
  spinner.prog += 0.01;

  spinner.prog_left = Calc.map(spinner.prog, 0.5, 1, spinner.start_left, spinner.end_left);
  spinner.prog_left = Calc.clamp(spinner.prog_left, spinner.start_left, spinner.end_left);

  spinner.prog_right = Calc.map(spinner.prog, 0, 0.5, spinner.start_right, spinner.end_right);
  spinner.prog_right = Calc.clamp(spinner.prog_right, spinner.start_right, spinner.end_right);

  spinner.right.style.transform = `rotate(${spinner.prog_right}rad)`;
  spinner.left.style.transform = `rotate(${spinner.prog_left}rad)`;

  requestAnimationFrame(loop);
}

loop();