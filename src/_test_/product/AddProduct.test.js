import React from 'react';
import AddProduct from '../../components/product/AddProduct';
import TextField from '@material-ui/core/TextField';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddArticle />', () => {
    it('renders two <TextInput /> components', () => {
        const wrapper = shallow(<AddProduct />);
        expect(wrapper.find(TextField)).toHaveLength(2);
    });
});