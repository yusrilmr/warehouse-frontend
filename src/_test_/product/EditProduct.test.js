import React from 'react';
import EditProduct from '../../components/product/EditProduct';
import TextField from '@material-ui/core/TextField';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

describe('<EditProduct />', () => {
    it('renders two <TextField /> components', () => {
        const wrapper = shallow(<EditProduct />);
        expect(wrapper.find(TextField)).toHaveLength(2);
    });
});

it('renders a snapshot', () => {
    const tree = TestRenderer.create(<EditProduct/>).toJSON();
    expect(tree).toMatchSnapshot();
});