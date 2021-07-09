import { mount, ReactWrapper } from "enzyme";
import TagForm from "../index";

const resetMessage = jest.fn();
const resetForm = jest.fn();
const cancelForm = jest.fn();
const submitAction = jest.fn();

const initialProps = {
  _id: "",
  resetMessage,
  serverError: "",
  serverMessage: "",
  resetForm,
  cancelForm,
  submitAction
};

describe("TagForm", () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<TagForm {...initialProps} />);
  });

  afterEach(() => {
    resetMessage.mockClear();
    resetForm.mockClear();
    cancelForm.mockClear();
    submitAction.mockClear();
  });

  it("renders without error ", () => {
    expect(wrapper.find("form")).toExist();
  });

  it("calls the handleChange which updates a field", () => {
    const value = "updated!";
    const name = "tagName";
    const inputNode = () => wrapper.find("[data-testid='tagName']").first();

    inputNode().simulate("change", { target: { name, value } });

    expect(inputNode()).toHaveProp("value", value);
  });

  // it("calls resetMessage when the form is unmounted", () => {
  //   wrapper.unmount();
  //   expect(resetMessage).toHaveBeenCalledTimes(1);
  // });

  it("when a tag submits an empty form, the form displays errors", () => {
    wrapper.find("form").simulate("submit");

    expect(wrapper.find("[data-testid='errors']")).toHaveLength(2);
  });

  describe("with form data", () => {
    beforeEach(() => {
      ["tagName", "category"].forEach(name => {
        wrapper
          .find(`[data-testid="${name}"]`)
          .first()
          .simulate("change", {
            target: { name, value: "taggy" }
          });
      });
    });

    it("when the form is submitted, it calls submitAction with form values and an id when there is no errors", () => {
      const value = "taggy";
      const _id = "";
      wrapper.find("form").simulate("submit");
      expect(submitAction).toHaveBeenCalledWith({
        _id,
        tagName: value,
        category: value
      });
    });

    it("calls resetForm when the serverMessage", () => {
      wrapper.find("form").simulate("submit");
      wrapper.setProps({ serverMessage: "message" });

      expect(resetForm).toHaveBeenCalledTimes(1);
    });

    it("when the form is submitted but a server error is thrown, then the form will not be submitting", () => {
      const submitButton = () => wrapper.find("[data-testid='submit']");
      wrapper.find("form").simulate("submit");

      expect(submitButton()).toHaveProp("disabled", true);

      wrapper.setProps({ serverError: "server" });
      wrapper.update();
      expect(submitButton()).toHaveProp("disabled", false);
    });
  });
});
