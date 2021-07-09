# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 2021-07-09

- Looking into updating the jest.json an tsconfig.json to so we can specify absolute paths to modules instead relative (which makes it difficult to interpret) using this format <https://til.hashrocket.com/posts/lmnsdtce3y-import-absolute-paths-in-typescript-jest-tests> but realized that the ~ path approach is better if you want a more flexible path configuration, so abandoning the absolute paths in most cases
- adding Tags as another element to the app to understand the code better
- using the .git/info/exclude file to exclude some files from Git source control locally
- adding poolSize setting within the database configuration so we can reduce or increase socket/connections to the database depending on our expected query loads
- replacing snackables with noshot/env
- restructured seeding to account for multiple databases
- adding bootstrap to simplify styling

### Adding Tags to this boilerplate

<details>
<summary>This explains some of the steps to setting up new pages. Here we setup 'tags' to be assigned to users.</summary>
<code>
- Copy the src/pages/users.tsx into a new file named tags.tsx
- Rename all of the instances of 'user' in the tags.tsx file to 'tag' (keep the same case as was used in the users page)
- Now we look at the errors in the tags.tsx file to work backwards through the scripts we need to create
- Copy the src/actions/Users folder contents and rename as a Tags folder
- Rename the src/actions/Tags/__tests__/Users.test.tsx to Tags.test.tsx, then update instances of user with tag within the script
- Now we need to copy the src/components/Forms/UserForm to TagForm
- Under src/constants/index.ts add TAG constants
- In src/types/index.d.ts we need a TagData type
- now we need a src/components/Layout/DisplayTagList
- we need to add sagas
- we need to add reducers/Tags
</code>
</details>
