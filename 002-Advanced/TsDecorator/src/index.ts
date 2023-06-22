import { DecoratorSample } from "./sample";
import { ClassSample } from "./classSample";
import { MethodSample } from "./methodSample";
import { AccessorSample } from "./accessorSample";
import { PropertySample } from "./propertySample";
import { ParameterSample } from "./parameterSample";
import { User } from "./loggerSample";
import { Greeter } from "./reflectMetadataSample";


//var sample = new DecoratorSample(1, 'hello');

//var classSample = new ClassSample();

//var methodSample = new MethodSample();

//var accessorSample = new AccessorSample();

//var propertySample = new PropertySample();

//var parameterSample = new ParameterSample();

//var user = new User();

var greeter = new Greeter('World');
var result = greeter.greet();
console.log(result);