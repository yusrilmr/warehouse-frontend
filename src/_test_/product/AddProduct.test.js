import React from 'react';
import AddProduct from '../../components/product/AddProduct';
import TextField from '@material-ui/core/TextField';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

describe('<AddProduct />', () => {
    it('renders two <TextInput /> components', () => {
        const wrapper = shallow(<AddProduct />);
        expect(wrapper.find(TextField)).toHaveLength(2);
    });
});

it('renders a snapshot', () => {
    const tree = TestRenderer.create(<AddProduct/>).toJSON();
    expect(tree).toMatchSnapshot();
});