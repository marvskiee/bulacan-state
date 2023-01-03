function Cluster() {
  this.canvas = document.querySelector("#canvas");
}
Cluster.prototype.init = function (green, black, red) {
  let color = { green: "#059669", black: "#111827", red: "#e11d48" };
  // format [number of nodes, color, xCentroids, yCentroids]
  if (black != 0) this.generateCircles(black, "black");
  if (red != 0) this.generateCircles(red, "red");
  if (green != 0) this.generateCircles(green, "green");
};
Cluster.prototype.generateCircles = function (num, name) {
  let counter = 1;
  let radius = 2;
  // let width = 100;
  // let height = 40;
  while (true) {
    const circle = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    circle.addEventListener("hover", function () {
      console.log("this");
    });
    circle.innerHTML = `<title>I'm a circle</title>`;
    this.canvas?.appendChild(circle);
    this.canvas?.appendChild(circle);
    this.setAttributeList(circle, {
      ...this.randomPoints(radius, 400 - radius, name),
      r: radius,
    });
    // breaker
    if (counter == num) {
      break;
    } else {
      counter += 1;
    }
  }
  console.log("canvas has been set!");
};
Cluster.prototype.Retry = function () {
  return;
};
Cluster.prototype.blackPointChecker = function (min, max) {
  let ranx;
  let rany;
  const retry = () => {
    ranx = Math.floor(Math.random() * (max - min + 1) + min);
    rany = Math.floor(Math.random() * (max - min + 1) + min);
  };
  while (true) {
    if (
      (ranx < 200 && ranx - rany > -10) ||
      (ranx >= 200 && rany < 220 && 400 - ranx - rany > -10)
    ) {
      return {
        cx: ranx,
        cy: rany,
        fill: "black",
      };
    } else {
      retry();
    }
  }
};
Cluster.prototype.redPointerChecker = function (min, max) {
  let ranx;
  let rany;
  const retry = () => {
    ranx = Math.floor(Math.random() * (max - min + 1) + min);
    rany = Math.floor(Math.random() * (max - min + 1) + min);
  };
  while (true) {
    if (ranx - rany < -30 && ranx < 190) {
      return {
        cx: ranx,
        cy: rany,
        fill: "red",
      };
    } else {
      retry();
    }
  }
};
Cluster.prototype.greenPointerChecker = function (min, max) {
  let ranx;
  let rany;
  const retry = () => {
    ranx = Math.floor(Math.random() * (max - min + 1) + min);
    rany = Math.floor(Math.random() * (max - min + 1) + min);
  };
  while (true) {
    if (ranx > 210 && 400 - ranx - rany < -30) {
      return {
        cx: ranx,
        cy: rany,
        fill: "green",
      };
    } else {
      retry();
    }
  }
};
Cluster.prototype.randomPoints = function (min, max, name) {
  if (name == "black") {
    return this.blackPointChecker(min, max);
  } else if (name == "red") {
    return this.redPointerChecker(min, max);
  } else {
    return this.greenPointerChecker(min, max);
  }
};
Cluster.prototype.setAttributeList = function (element, props) {
  Object.entries(props).forEach(([key, value]) => {
    element.setAttributeNS(null, key, value);
  });
  console.log("canvas has been set attribute!");
};
export const startVisual = (ct1, ct2, ct3) => {
  const cluster = new Cluster();
  cluster.init(ct1, ct2, ct3);
};
