import React from 'react';
import ReactTable from "react-table";
import ProductList from '../../components/product/ProductList';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

describe('<ProductList />', () => {
    it('renders one <ReactTable /> components', () => {
        const wrapper = shallow(<ProductList />);
        expect(wrapper.find(ReactTable)).toHaveLength(1);
    });
});

// it('renders a snapshot', () => {
//     const tree = TestRenderer.create(<ProductList/>).toJSON();
//     expect(tree).toMatchSnapshot();
// });