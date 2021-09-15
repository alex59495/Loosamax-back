import Enzyme from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';
import 'regenerator-runtime/runtime';

Enzyme.configure({ adapter: new EnzymeAdapter()});
