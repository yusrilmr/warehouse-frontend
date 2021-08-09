import React from 'react';
import TextField from '@material-ui/core/TextField';
import SellProduct from '../../components/product/SellProduct';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<SellProduct />', () => {
    it('renders one <TextField /> components', () => {
        const wrapper = shallow(<SellProduct />);
        expect(wrapper.find(TextField)).toHaveLength(1);
    });
});