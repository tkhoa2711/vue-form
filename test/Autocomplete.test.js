import { mount } from '@vue/test-utils'
import Autocomplete from '@/components/Autocomplete';

describe('Autocomplete component', () => {
  let wrapper;
  const testItems = [
    'item 1',
    'item 2',
  ];

  beforeEach(() => {
    wrapper = mount(Autocomplete, {
      propsData: {
        items: testItems,
      }
    });
    return wrapper;
  });

  it('is a visible Vue component', () => {
    expect(wrapper.isVueInstance).toBeTruthy();
    expect(wrapper.isVisible).toBeTruthy();
  });

  it('mounts correctly without providing a list of items', () => {
    wrapper = mount(Autocomplete);
    expect(wrapper.props('items')).toEqual([]);
  });

  it('shows no result at first', () => {
    expect(wrapper.findAll('li.autocomplete-result')).toHaveLength(0);
  });
});
