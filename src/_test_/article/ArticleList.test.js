import React from 'react';
import ReactTable from "react-table";
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ArticleList from "../../components/article/ArticleList";

Enzyme.configure({ adapter: new Adapter() });

describe('<ArticleList />', () => {
    it('renders one <ReactTable /> components', () => {
        const wrapper = shallow(<ArticleList />);
        expect(wrapper.find(ReactTable)).toHaveLength(1);
    });
});