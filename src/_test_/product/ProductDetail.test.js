import React from 'react';
import ReactTable from "react-table";
import ProductDetail from '../../components/product/ProductDetail';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<EditProduct />', () => {
    it('renders one <ReactTable /> components', () => {
        const wrapper = shallow(<ProductDetail />);
        expect(wrapper.find(ReactTable)).toHaveLength(1);
    });
});