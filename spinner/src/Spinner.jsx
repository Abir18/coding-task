import {useEffect, useRef, useState} from "react";
import "./App.css";

const Spinner = ({names}) => {
  const canvasRef = useRef(null);
  const [selectedName, setSelectedName] = useState(null);
  const [rotation, setRotation] = useState(0);

  const drawWheel = (ctx, names) => {
    const numSegments = names.length;
    const arcSize = (2 * Math.PI) / numSegments;
    const radius = 180;

    for (let i = 0; i < numSegments; i++) {
      const angle = i * arcSize;
      ctx.beginPath();
      ctx.moveTo(200, 200);
      ctx.arc(200, 200, radius, angle, angle + arcSize, false);
      ctx.closePath();
      ctx.fillStyle = `hsl(${(i * 360) / numSegments}, 100%, 50%)`;
      ctx.fill();
      ctx.stroke();

      ctx.save();
      ctx.translate(
        200 + Math.cos(angle + arcSize / 2) * radius * 0.6,
        200 + Math.sin(angle + arcSize / 2) * radius * 0.6
      );
      ctx.rotate(angle + arcSize / 2 + Math.PI / 2);
      ctx.fillStyle = "white";
      ctx.font = "bold 24px serif";
      ctx.fillText(names[i], -ctx.measureText(names[i]).width / 2, 0);
      ctx.restore();
    }
  };

  const drawIndicator = (ctx, angle) => {
    const radius = 150;
    const x = 200 + Math.cos(angle) * radius;
    const y = 200 + Math.sin(angle) * radius;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 20, y - 10);
    ctx.lineTo(x - 20, y + 10);
    ctx.closePath();
    ctx.fill();
  };

  const spinWheel = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const numSegments = names.length;
    const arcSize = (2 * Math.PI) / numSegments;
    const spinAngle =
      Math.random() * numSegments * arcSize + numSegments * 2 * Math.PI;
    const totalRotation = spinAngle + Math.PI / 2; // Add offset to align with the right-side indicator
    const selectedIndex = Math.floor((totalRotation % (2 * Math.PI)) / arcSize);

    let rotation = 0;
    const spinSpeed = 30;
    const spin = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.translate(200, 200);
      ctx.rotate(rotation);
      ctx.translate(-200, -200);
      drawWheel(ctx, names);
      ctx.restore();

      const indicatorAngle = rotation % (2 * Math.PI);
      drawIndicator(ctx, indicatorAngle);

      rotation += (spinSpeed * Math.PI) / 180;
      if (rotation < totalRotation) {
        requestAnimationFrame(spin);
      } else {
        setSelectedName(names[selectedIndex]);
        setRotation(totalRotation);
      }
    };
    spin();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    drawWheel(ctx, names);
    if (rotation) {
      drawIndicator(ctx, rotation % (2 * Math.PI));
    }
  }, [names, rotation]);

  return (
    <div className="spinner-container">
      <div>
        <canvas ref={canvasRef} width={400} height={400} />
        <div>
          <button
            onClick={spinWheel}
            style={{
              marginTop: "20px",
              padding: "10px 60px",
              background: "blue"
            }}
          >
            Spin it!
          </button>
        </div>
      </div>
      <div>
        <h3>Add Names</h3>
        <div className="names">
          {names.map((name) => (
            <p key={name}>{name}</p>
          ))}
        </div>
        <div>
          {selectedName && (
            <div className="selected-name">"{selectedName}" is Winner!</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Spinner;
