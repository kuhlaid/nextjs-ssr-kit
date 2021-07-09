import { mount, ReactWrapper } from "enzyme";
import DisplayTagList from "../index";

const deleteTag = jest.fn();
const handleEditClick = jest.fn();
const handleCloseModal = jest.fn();
const handleResetEditClick = jest.fn();
const resetMessage = jest.fn();
const updateTag = jest.fn();

const initialProps = {
  _id: "1",
  data: [],
  deleteTag,
  handleEditClick,
  handleCloseModal,
  handleResetEditClick,
  resetMessage,
  updateTag
};

describe("DisplayTagList", () => {
  let wrapper: ReactWrapper;
  let cardNode: () => ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<DisplayTagList {...initialProps} />);
    cardNode = () => wrapper.find("[data-testid='card-container']");
  });

  afterEach(() => {
    deleteTag.mockClear();
    handleEditClick.mockClear();
    handleCloseModal.mockClear();
    handleResetEditClick.mockClear();
    resetMessage.mockClear();
    updateTag.mockClear();
  });

  it("initially renders no data", () => {
    expect(wrapper.find("[data-testid='no-data']")).toExist();
  });

  describe("when data is present", () => {
    beforeEach(() => {
      wrapper.setProps({
        data: [
          {
            _id: "1",
            tagName: "SQL Server",
            category: "Database",
            isEditingID: "",
            handleCloseModal,
            handleResetEditClick,
            resetMessage,
            updateTag
          }
        ]
      });
    });
    it("renders the card when there is no editing ID", () => {
      expect(cardNode()).toExist();
    });

    it("calls deleteTag when the delete button is clicked", () => {
      wrapper
        .find("[data-testid='dropdown-container']")
        .first()
        .simulate("click");

      wrapper.find("[data-testid='delete']").first().simulate("click");

      expect(deleteTag).toHaveBeenCalledWith("1");
    });

    it("calls handleEditClick when the edit button is clicked", () => {
      wrapper
        .find("[data-testid='dropdown-container']")
        .first()
        .simulate("click");

      wrapper.find("[data-testid='edit']").first().simulate("click");

      expect(handleEditClick).toHaveBeenCalledWith("1");
    });

    it("renders the tagForm when there is an editing ID", () => {
      wrapper.setProps({ isEditingID: "1" });

      expect(wrapper.find("[data-testid='tag-form']")).toExist();
    });
  });
});
