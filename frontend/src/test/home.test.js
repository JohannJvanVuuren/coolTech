/* Import of the enzyme related modules and methods */
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { shallow } from 'enzyme';

/* Import of the expect assertion library from Chai */
import { expect } from 'chai';

/* Import of jest-dom for DOM node assertions*/
import '@testing-library/jest-dom';

/* Import of the components being tested */
import { Home } from '../components/Home';
import { Header } from '../components/Header';
import { NavigationBar} from '../components/NavigationBar';

/* Configuration of the enzyme adapter */
Enzyme.configure({ adapter: new Adapter() });

/* Testing of the rendering of the Header component */
describe('<Home/> component', () => {
    /* Confirming that one Header component is rendered */
    it('Renders one Header component', () => {
        const wrapper = shallow(<Home/>);
        expect(wrapper.find(Header)).to.have.lengthOf(1);
    })

    /* Confirming that one .home-logo image is rendered */
    it('Renders one .home-logo image', () => {
        const wrapper = shallow(<Home/>);
        expect(wrapper.find('.home-logo')).to.have.lengthOf(2);
    })

    /* Confirming that one NavigationBar component is rendered */
    it('Renders one NavigationBar component', () => {
        const wrapper = shallow(<Home/>);
        expect(wrapper.find(NavigationBar)).to.have.lengthOf(1);
    })

    /* Confirming that .home-wrapper div is rendered */
    it('Renders one .home-wrapper div element', () => {
        const wrapper = shallow(<Home />);
        expect(wrapper.find('.home-wrapper')).to.have.lengthOf(1)
    })
})