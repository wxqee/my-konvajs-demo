import React from 'react';
import { Stage, Layer, Group, Text, Rect, Transformer } from 'react-konva';

const MyRect = ({ x, y, width, height, onChange = () => {} }) => {
  const trRef = React.useRef();
  const shapeRef = React.useRef();

  React.useEffect(() => {
      // we need to attach transformer manually
    trRef.current.setNode(shapeRef.current);
    trRef.current.getLayer().batchDraw();
  });

  return (
    <React.Fragment>
      <Group
        ref={shapeRef}
        x={x}
        y={y}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const rotation = node.rotation();

          console.log('scaleX, scaleY => %s, %s', scaleX, scaleY);

          const newShapeProps = {
            x: node.x(),
            y: node.y(),
            rotation: rotation || 0,
            // set minimal value
            width: Math.max(5, width * scaleX),
            height: Math.max(height * scaleY)
          };

          onChange(newShapeProps);
        }}
      >
        <Rect x={0} y={0} width={width} height={height} fill={'#ff0'} />
        <Text x={0} y={0} width={width} height={height} verticalAlign={'middle'} align={'center'} text={'Hello, world\nI am here'} />
      </Group>
      <Transformer
        ref={trRef}
        rotate
        boundBoxFunc={(oldBox, newBox) => {
          // limit resize
          if (newBox.width < 5 || newBox.height < 5) {
            return oldBox;
          }
          return newBox;
        }}
      />
    </React.Fragment>
  );
}

// const initialGraphs = [
//   {
//     id: 'g1',
//     x: 10,
//     y: 10,
//     width: 100,
//     height: 100,
//     fill: 'red',
//   }
// ];

const ExampleTwo = () => {
  // const [graphs, setGraphs] = React.useState(initialGraphs);
  const [selectedId, selectShape] = React.useState(null);

  console.log('[selected] =>', selectedId);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
      }}
    >
      <Layer>
        <MyRect
          x={100}
          y={100}
          width={200}
          height={100}
          onChange={(newProps) => {
            console.log('new group of rect should be => %o', newProps);
          }}
        />
      </Layer>
    </Stage>
  );
}

export default ExampleTwo;
