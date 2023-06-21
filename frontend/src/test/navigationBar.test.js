/* Import of the enzyme related modules and methods */
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';

/* Import of the expect assertion library from Chai */
import { expect } from 'chai';

/* Import of jest-dom for DOM node assertions*/
import '@testing-library/jest-dom';

/* Import of the components being tested */
import { NavigationBar } from '../components/NavigationBar';
import {Link} from 'react-router-dom';

/* Configuration of the enzyme adapter */
Enzyme.configure({ adapter: new Adapter() });

/* Testing of the rendering of the Header component */
describe('<NavigationBar/> component', () => {
    /* Confirming that one .navigation-component div is rendered */
    it('Renders one .navigation-component div element', () => {
        const wrapper = shallow(<NavigationBar/>);
        expect(wrapper.find('.navigation-component')).to.have.lengthOf(1);
    })

    /* Confirming that seven Link component are rendered */
    it('Renders seven Link components', () => {
        const wrapper = shallow(<NavigationBar/>);
        expect(wrapper.find(Link)).to.have.lengthOf(7);
    })
})