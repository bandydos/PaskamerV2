const getIndexByBreakpoints = (breakpoints, value) => {
  let i = 0;

  while (i < breakpoints.length) {
    const element = breakpoints[i];

    if (i === 0 && value < element) {
      return i;
    }

    if (i === breakpoints.length - 1 && value >= element) {
      return i;
    }

    const previousElement = breakpoints[i - 1];

    if (value >= previousElement && value < element) {
      return i;
    }

    i++;
  }
};

//#region classes
class Person {
  gender;

  static get sizes() {
    return ['XS', 'XS or S', 'S', 'S or M', 'M', 'M or L', 'L', 'L or XL', 'XL']; // Less sizes.
  }

  gender = '';

  get heightBreakpoints() {
    return [];
  }

  constructor() {
    this.age = $('#enter-age').val();
    this.weight = parseFloat($('#enter-weight').val());
    this.height = parseFloat($('#enter-height').val());
    this.bodyType = $('#select-body-type').val();
    this.style = $('#select-style').val();
  }

  isValid() {
    return !!this.gender && !!this.age && !!this.weight && !!this.height && !!this.bodyType && !!this.style;
  }

  getHeightCategory() {
    return getIndexByBreakpoints(this.heightBreakpoints, this.height);
  }

  getBMI(){
    return this.weight / Math.pow((this.height/100), 2);
  }

  getSizeToWear() {
    var heightCategory = this.getHeightCategory();
    const bmi = this.getBMI();

    var sizeIndex = heightCategory; // Gelijkstellen aan heightcat.

    // BMI influence.
    if(bmi <= 19){
      sizeIndex --;
    } else if(bmi >= 25 && bmi < 30){
      sizeIndex ++;
    } else if(bmi >= 30){
      sizeIndex = sizeIndex + 2;
    }

    // Bodytype influence
    if (this.bodyType === 'g') sizeIndex--;
    if (this.bodyType === 'p') sizeIndex++;

    // Style influence
    if (this.style === 's') sizeIndex--;
    if (this.style === 'l') sizeIndex++;


    // Min and max standards
    if(heightCategory == 0){
      sizeIndex = heightCategory;
    }
    if(heightCategory == 8){
      sizeIndex = heightCategory;
    }


    console.log(sizeIndex);

    return Person.sizes[sizeIndex];
  }
}

class Male extends Person {
  gender = 'm';

  get heightBreakpoints() {
    return [146, 153, 160, 167, 174, 181, 189, 196, 203]; // 9 values for height
  }
}

class Female extends Person {
  gender = 'f';

  get heightBreakpoints() {
    return [145, 150, 155, 160, 165, 170, 180, 185, 190];
  }
}

class PersonFactory {
  static generatePerson(gender) {
    if (gender === 'm') {
      return new Male();
    } else if (gender === 'f') {
      return new Female();
    } else {
      return null;
    }
  }
}
//#endregion

$('#btn-generate').click(() => {
  const paragraphSize = $('#p-size');

  const selectedGender = $('#select-gender').val();

  const person = PersonFactory.generatePerson(selectedGender);

  if (!person || !person.isValid()) {
    paragraphSize.text('Please fill in all fields correctly.');
    return;
  }

  const size = person.getSizeToWear();

  paragraphSize.text(`You should go for ${size}.`);
  console.log("Height cat: " + person.getHeightCategory());
  console.log("BMI: " + person.getBMI());
  console.log("Size: " + person.getSizeToWear());

});
