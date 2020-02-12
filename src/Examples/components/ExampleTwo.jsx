import React from 'react';
import { Stage, Layer, Group, Text, Rect, Ellipse, Transformer } from 'react-konva';

const MyRect = ({ shapeProps, onChange = () => {} }) => {
  const trRef = React.useRef();
  const shapeRef = React.useRef();
  const { x, y, width, height } = shapeProps;

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
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const rotation = node.rotation();

          console.log('scaleX, scaleY => %s, %s', scaleX, scaleY);

          // work with onChange, because width,height of dom has been set to new
          // meanwhile need to set scaleX,scaleY back to 1 times of shape.
          node.scaleX(1);
          node.scaleY(1);

          const newShapeProps = {
            ...shapeProps,
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
        <Ellipse x={width/2} y={height/2} width={width} height={height} fill={'#ff0'} />
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

const initialShapes = [
  {
    id: 'g1',
    x: 100,
    y: 100,
    width: 200,
    height: 100,
    fill: 'yellow',
  }
];

const ExampleTwo = () => {
  const [shapes, setShapes] = React.useState(initialShapes);
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
        {shapes.map(shapeProps => (
          <MyRect
            key={shapeProps.id}
            shapeProps={shapeProps}
            onChange={(newProps) => {
              console.log('new group of rect should be => %o', newProps);
              const newShapes = shapes.map(shape => {
                if (shape.id === shapeProps.id) {
                  return {
                    ...shape,
                    ...newProps,
                  };
                }
                return shape;
              });
              setShapes(newShapes);
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
}

export default ExampleTwo;
