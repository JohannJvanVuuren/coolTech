/* Import of the enzyme related modules and methods */
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';

/* Import of the expect assertion library from Chai */
import { expect } from 'chai';

/* Import of jest-dom for DOM node assertions*/
import '@testing-library/jest-dom';

/* Import of the components being tested */
import { LandingPage } from '../components/LandingPage';
import { Link } from 'react-router-dom';

/* Configuration of the enzyme adapter */
Enzyme.configure({ adapter: new Adapter() });

/* Testing of the rendering of the Header component */
describe('<LandingPage/> component', () => {
    /* Confirming that two Link components are rendered */
    it('Renders two Link component', () => {
        const wrapper = shallow(<LandingPage/>);
        expect(wrapper.find(Link)).to.have.lengthOf(2);
    })

    /* Confirming that one .landing-page-logo image is rendered */
    it('Renders one .landing-page-logo', () => {
        const wrapper = shallow(<LandingPage/>);
        expect(wrapper.find('.landing-page-logo')).to.have.lengthOf(1);
    })

    /* Confirming that one h1 element is rendered */
    it('Renders one h1 element', () => {
        const wrapper = shallow(<LandingPage/>);
        expect(wrapper.find('h1')).to.have.lengthOf(1);
    })

    /* Confirming that one h2 element is rendered */
    it('Renders one h2 element', () => {
        const wrapper = shallow(<LandingPage/>);
        expect(wrapper.find('h2')).to.have.lengthOf(1);
    })

})