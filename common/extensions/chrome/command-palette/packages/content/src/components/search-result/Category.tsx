import { SearchCategory } from '@dcp/shared';
import { searchCategoryMapping } from '~/utils/mapping';
import Chip from '../Chip';

export const Category = (props: { category: SearchCategory }) => {
	const category = searchCategoryMapping(props.category);

	if (!category) return null;

	return <Chip {...category} />;
};

export default Category;
