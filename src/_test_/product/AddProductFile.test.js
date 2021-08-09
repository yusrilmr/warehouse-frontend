import React from 'react';
import {DropzoneDialog} from "material-ui-dropzone";
import AddProductFile from '../../components/product/AddProductFile';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddArticle />', () => {
    it('renders one <DropzoneDialog /> components', () => {
        const wrapper = shallow(<AddProductFile />);
        expect(wrapper.find(DropzoneDialog)).toHaveLength(1);
    });
});