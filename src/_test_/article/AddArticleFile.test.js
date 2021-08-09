import React from 'react';
import { DropzoneDialog } from 'material-ui-dropzone'
import AddArticleFile from '../../components/article/AddArticleFile';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TestRenderer from "react-test-renderer";

Enzyme.configure({ adapter: new Adapter() });

describe('<AddArticleFile />', () => {
    it('renders one <DropzoneDialog /> components', () => {
        const wrapper = shallow(<AddArticleFile />);
        expect(wrapper.find(DropzoneDialog)).toHaveLength(1);
    });
});

it('renders a snapshot', () => {
    const tree = TestRenderer.create(<AddArticleFile/>).toJSON();
    expect(tree).toMatchSnapshot();
});