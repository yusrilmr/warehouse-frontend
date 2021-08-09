import React from 'react';
import ReactTable from "react-table";
import ProductDetail from '../../components/product/ProductDetail';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

describe('<ProductDetail />', () => {
    it('renders one <ReactTable /> components', () => {
        const wrapper = shallow(<ProductDetail />);
        expect(wrapper.find(ReactTable)).toHaveLength(1);
    });
});

it('renders a snapshot', () => {
    const tree = TestRenderer.create(<ProductDetail/>).toJSON();
    expect(tree).toMatchSnapshot();
});