import { mount } from "enzyme";
import TagListNavigation from "../index";

const openModal = jest.fn();
const seedDB = jest.fn();

const initProps = {
  className: "",
  openModal,
  seedDB
};

const wrapper = mount(<TagListNavigation {...initProps} />);

describe("TagListNavigation", () => {
  it("renders without errors", () => {
    expect(wrapper).toExist();
  });
});
