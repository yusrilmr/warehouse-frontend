import React from 'react';
import AddArticle from '../../components/article/AddArticle';
import TextField from '@material-ui/core/TextField';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<AddArticle />', () => {
    it('renders three <TextInput /> components', () => {
        const wrapper = shallow(<AddArticle />);
        expect(wrapper.find(TextField)).toHaveLength(3);
    });
});