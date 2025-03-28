const ColorPicker = ({ selectedColor, setSelectedColor }) => {
  const pastelColors = ["#5EC2A8", "#FF8FA3", "#8AB6F9", "#FFD782", "#C28FFF", "#FFFFFF"];

  
    return (
      <div className="flex gap-2 mt-2">
        {pastelColors.map((color, i) => (
          <button
            key={i}
            className={`w-6 h-6 rounded-full border ${selectedColor === color ? "border-black" : "border-none"} shadow-sm`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    );
  };
  
  export default ColorPicker;
  