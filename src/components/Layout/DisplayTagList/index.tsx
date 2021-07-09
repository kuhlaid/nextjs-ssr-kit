/**
 * @abstract Builds the tags list.
 */
import * as React from "react";
import isEmpty from "lodash.isempty";
import Badge from "react-bootstrap/Badge";
import TagForm from "~components/Forms/TagForm";
import Card from "~components/Layout/TagCard";
// import Container from "~components/Layout/Container";
import FadeIn from "~components/Layout/FadeIn";
import NoData from "~components/Layout/NoData";
import { TagData } from "~types";

export interface DisplayTagListProps {
  data: any[];
  isEditingID?: string;
  deleteTag: (id: string) => void;
  handleCloseModal: (event: any) => void;
  handleEditClick: (id: string) => void;
  handleResetEditClick: (event: any) => void;
  resetMessage: () => void;
  updateTag: (payload: TagData) => void;
}

const DisplayTagList = ({
  data,
  isEditingID,
  handleCloseModal,
  handleEditClick,
  handleResetEditClick,
  updateTag,
  deleteTag,
  ...rest
}: DisplayTagListProps): JSX.Element => (
  <>
    {!isEmpty(data) ? (
      data.map((props: TagData, idx) => (
        <Badge
          className="m-2 p-2"
          variant="light"
          data-testid="tag-card"
          key={props._id}
        >
          {isEditingID !== props._id ? (
            <Card
              {...props}
              {...rest}
              key={props._id}
              _id={props._id}
              idx={idx}
              handleEditClick={handleEditClick}
              deleteTag={deleteTag}
            />
          ) : (
            <FadeIn timing="0.3s">
              <TagForm
                {...props}
                {...rest}
                key={props._id}
                cancelForm={handleResetEditClick}
                resetForm={handleCloseModal}
                submitAction={updateTag}
              />
            </FadeIn>
          )}
        </Badge>
      ))
    ) : (
      <NoData dataType="tag" />
    )}
  </>
);

export default DisplayTagList;
