import React from 'react';
import {DropzoneDialog} from "material-ui-dropzone";
import AddProductFile from '../../components/product/AddProductFile';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

describe('<AddProductFile />', () => {
    it('renders one <DropzoneDialog /> components', () => {
        const wrapper = shallow(<AddProductFile />);
        expect(wrapper.find(DropzoneDialog)).toHaveLength(1);
    });
});

it('renders a snapshot', () => {
    const tree = TestRenderer.create(<AddProductFile/>).toJSON();
    expect(tree).toMatchSnapshot();
});