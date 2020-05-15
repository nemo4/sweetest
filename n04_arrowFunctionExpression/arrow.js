var materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(
    materials.map(function(material) { 
      return material.length; 
    })
);
    
// 위에 있는 함수를 화살표 함수를 이용해 아래와 같이 표현할 수 있다
console.log(
    materials.map((material) => {
      return material.length;
    })
);

// 파라미터(parameter)가 오직 하나일 경우, 그것을 감싸는 괄호를 삭제할 수 있다.
console.log(
    materials.map(material => { 
       return material.length; 
    })
);

console.log(
    materials.map(({length}) => length)
);