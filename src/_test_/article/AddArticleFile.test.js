import React from 'react';
import { DropzoneDialog } from 'material-ui-dropzone'
import AddArticleFile from '../../components/article/AddArticleFile';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddArticleFile />', () => {
    it('renders one <DropzoneDialog /> components', () => {
        const wrapper = shallow(<AddArticleFile />);
        expect(wrapper.find(DropzoneDialog)).toHaveLength(1);
    });
});