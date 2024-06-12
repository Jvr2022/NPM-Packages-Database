## Group class

This page will document all methods and properties of the Group class

***

[](#top)
 - **[Methods](#methods)**
    ***
    - [acceptJoinRequest](#acceptjoinrequest)
    - [changeRank](#changerank)
    - [declineJoinRequest](#declinejoinrequest)
    - [deleteWallPost](#deletewallpost)
    - [deleteWallPostsByUser](#deletewallpostsbyuser)
    - [demote](#demote)
    - [exileUser](#exileuser)
    - [getAuditLogs](#getauditlogs)
    - [getGroupFunds](#getgroupfunds)
    - [getJoinRequests](#getjoinrequests)
    - [getMyPermissions](#getmypermissions)
    - [getRankNameInGroup](#getranknameingroup)
    - [getRole](#getrole)
    - [getRoles](#getroles)
    - [getUsers](#getusers)
    - [getUsersWithRole](#getuserswithrole)
    - [getWall](#getwall)
    - [isInGroup](#isingroup)
    - [joinGroup](#joingroup)
    - [onGroupChange](#ongroupchange)
    - [onJoinRequest](#onjoinrequest)
    - [onWallPost](#onwallpost)
    - [payout](#payout)
    - [postOnWall](#postonwall)
    - [postShout](#postshout)
    - [promote](#promote)
    - [setAsPrimaryGroup](#setasprimarygroup)
    - [setRank](#setrank)

 - **[Properties](#properties)**
    ***
    - [description](#description)
    - [groupId](#groupid)
    - [memberCount](#membercount)
    - [owner](#owner)
    - [shout](#shout)

***


## Methods
***

### acceptJoinRequest
##### requestId
Accepts a join request by its request id

**Parameters**

- requestId (Number) - The id of the join request

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.acceptJoinRequest(123).then( () => {
    console.log("Accepted")
})
```

***

### changeRank
##### userId, amount
Changes a group member's rank to the next rank above or below their current rank. (-1 for below, 1 for above)

**Parameters**

- userId (Number) - The id of the group member
- amount (Number) - The amount to change the rank with

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.changeRank(18442032, 1).then( () => {
    console.log("Changed user's rank")
})
```

***


### declineJoinRequest
##### requestId
Declines a join request by its request id

**Parameters**

- requestId (Number) - The id of the join request

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.declineJoinRequest(123).then( () => {
    console.log("Declined join request");
})
```

***

### deleteWallPost 
##### postId
Deletes a wall post from the group wall

**Parameters**

- postId (Number) - The id of the post

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.deleteWallPost(123).then( () => {
    console.log("Deleted wall post");
})
```

***

### deleteWallPostsByUser
##### userId
Deletes all posts by a user from the group

**Parameters**

- userId (Number) - The id of the user to remove the posts from

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.deleteWallPostsByUser(18442032).then( () => {
    console.log("Deleted user's posts");
})
```

***

### demote
##### userId
Demotes a user in the group (same as changeRank(userId, -1))

**Parameters**

- userId - The id of the user to demote

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.demote(18442032).then( () => {
    console.log("Demoted user");
})
```

***

### exileUser
##### userId
Kicks/exiles a user from the group

**Parameters**

- userId (Number) - The id of the user to kick/exile

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.exileUser(18442032).then( () => {
    console.log("Kicked user");
})
```

***

### getAuditLogs
##### *(options)*
Gets audit logs in a group, can be filtered by providing options

**Parameters**
- *options (Object)* - The optional settings to provide
- *options.action (Number)* - The id of the action (you can find this by manually going to the audit logs page for your group and filtering by action and getting the id from the URL)
- *options.page (Number)* - The page to retrieve
- *options.username (String)* - If you want to get all actions made by a user

**Returns**

- Promise(Array[Class-AuditLog])
- Class-AuditLog.action (String)
- Class-AuditLog.date (Date)
- Class-AuditLog.user (Class-PartialUser)

**Example**
```JavaScript
.getAuditLogs({
    page:1,
    username: 'CodeTheIdiot'
}).then(actions=>{
    console.log(actions);
})
```

***

### getGroupFunds
##### 
Gets the group's current funds

**Parameters**

- None

**Returns**

- Promise (Number)

**Example**
```JavaScript
.getGroupFunds().then(funds=>{
    console.log(`Group has ${funds} robux`);
})
```

***

### getJoinRequests
##### *(options)*
Gets the group's join requests ( group must be set to manual approval)

**Parameters**

- *options (Object)* - The optional options to provide
- *options.page (Number)* - The page to retrieve
- *options.username (String)* - Gets join requests from the user with this name (still returns an array)
- *options.userId (Number)* - Gets join requests from the user with this id (still returns an array)

**Returns**

- Promise (Array[Class-JoinRequest])

**Example**
```JavaScript
.getJoinRequests({
    userId: 18442032
}).then(reqs=>{
    console.log(`Got ${reqs.length} join requests`);
})
```

***

### getMyPermissions
######
Gets the authenticated roblox user's permissions in the group

**Parameters**

- None

**Returns**

- Class-MyGroupPermissions

**Example response**
```
MyGroupPermissions {
  groupId: 3544434,
  isPrimary: false,
  isPendingJoin: false,
  userRole:
   { user:
      PartialUser {
        _self: [BloxyClient],
        userId: 18442032,
        username: 'CodeTheIdiot',
        buildersClub: null },
     role: { id: 24349662, name: 'Martin (Owner) ', rank: 255 } },
  maxGroups: 5,
  permissions:
   { groupPostsPermissions:
      { viewWall: true,
        postToWall: true,
        deleteFromWall: true,
        viewStatus: true,
        postToStatus: true },
     groupMembershipPermissions:
      { changeRank: true, inviteMembers: true, removeMembers: true },
     groupManagementPermissions:
      { manageRelationships: true,
        manageClan: true,
        viewAuditLogs: true },
     groupEconomyPermissions:
      { spendGroupFunds: true,
        advertiseGroup: true,
        createItems: true,
        manageItems: true,
        addGroupPlaces: true,
        manageGroupGames: false } } }
```

**Example**
```JavaScript
.getMyPermissions().then(p=>{
    console.log(p);
})
```

***

### getRankNameInGroup
##### userId
Gets a user's rank name in the group

**Parameters**

- username (Number) - The id of the user to get the rank of in the group

**Returns**

- Promise (String)

**Example**
```JavaScript
.getRankNameInGroup(18442032).then(rank=>{
    console.log(rank);
})
```

***

### getRole
##### filter
Gets a role in the group by the filter object

(You can provide one, but the more the better )
**Parameters**

- filter (Object)
- filter.name (String) - The name of the role (must be exactly the same)
- filter.id (Number) - The id of the role
- filter.rank - The rank of the role (0-255)

**Returns**

- Promise (Class-GroupRole)

**Example**
```JavaScript
.getRole({
    name: "role1",
    id: 3123112,
    rank: 150
}).then(role=>{
    if (role) console.log(`Got role ${role.name}`)
})
```

***

### getRoles
##### 
Gets all the roles in a group

**Parameters**

- None

**Returns**

- Promise (Array[Class-GroupRole])

**Example**
```JavaScript
.getRoles().then(roles=>{
    console.log(`Group has ${roles.length} roles in total`);
})
```

***

### getUsers 
##### *options*
Gets the users in a group

**Parameters**

- *options (Object)* - The optional objects to provide
- *options.page (Number)* - The page to retrieve of users

**Returns**

- Promise (Array[Class-PartialUser])

**Example**
```JavaScript
.getUsers({
    page: 2
}).then(users=>{
    console.log(`${users.length} users found!`);
})
```

***

### getUsersWithRole
##### roleId
Gets the users in the group with the provided role

**Parameters**

- roleId (Number)

**Returns**

- Promise (Results)
- Results.users
- Results.nextPageCursor
- Results.previousPageCursor

**Example**
```JavaScript
.getUsersWithRole(2312321321).then(res=>{
    console.log(res);
})
```

***

### getWall
##### *(options)*
Gets the group's wall

**Parameters**

- *options* (Object) - The optional options to provide
- *options.page (Number)* - The page to retrieve

**Returns**

- Promise (Results)
- Results.posts
- Results.nextPageCursor
- Results.previousPageCursor

**Example**
```JavaScript
.getWall({
    page:2
}).then(result=>{
    console.log(result);
})
```

***


### isInGroup
##### userId

**Parameters**

- userId (Number) - The id of the user to check if they are in the group or not

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.isInGroup(18442032).then(isIn=>{
    console.log(`Is user in group: ${isIn}`);
})
```

***

### joinGroup
#####

**Parameters**

- None

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.joinGroup().then( () => {
    console.log("Joined group");
})
```


***

### onGroupChange
##### *(options)*
Returns a class that will emit 'shout' when a new shout has been made

**Parameters**

- *options.interval (Number)* - The amount of ms to check for new shout 

**Returns**

- Promise (GroupChangeEvent)

**Emits**

- 'shout': {new: GroupShout, old: GroupShout} - Fired when a new shout has been made
- 'ready': nothing - Fired when it's ready to detect new changes


**Example**
```JavaScript
let onChange = group.onGroupChange();
onChange.on('ready', function () {
    console.log("Waiting for new shout");
})

onChange.on('shout', function (data) {
    console.log(data);
})
```

***

### onJoinRequest
##### *(options)*
Returns a class that will emit 'requests' when there are new join requests

**Parameters**

- *options.interval (Number)* - The amount of ms to check for new join requests

**Returns**

- Promise (Class-JoinRequestEvent)

**Emits**

- 'requests': [Class-JoinRequest] - Fired whenever there are new requests
- 'ready' nothing - Fired when it's ready to detect new join requests


**Example**
```JavaScript
let onJoin = group.onJoinRequest();
onJoin.on('ready', function() {
    console.log("Waiting for new join requests");
})

onJoin.on('requests', function (requests) {
    console.log(`Got ${requests.length} new requests`);
})
```

***

### payout
##### options
Pays members in the group

**Parameters**

- options (Object) - The options
- options.members (Array) - Array containing info about members to pay
- options.members.userId (Number) - Id of the user to pay
- options.members.amount (Number) - Amount to pay the user (either % or amt)
- options.recurring (Boolean) - Whether or not the payment to be recurring
- options.usePercentage (Boolean) - Whether or not the payment should use percentage

**Returns**

- Promise (Boolean)

**Examples**
```JavaScript
// Paying a user once

.payout({
    members: [
        {
            userId: 18442032,
            amount: 123
        }
    ],
    recurring: false,
    usePercentage: false
}).then( () => {
    console.log("Paid 123 robux");
})

// Paying several users with percentage

.payout({
    members: [
        {
            userId: 18442032,
            amount:25
        },
        {
            userId: 12345678,
            amount: 75
        }
    ],
    recurring: false,
    usePercentage: true
}).then( () => {
    console.log("paid them 100%");
})

// Paying a user recurringly

.payout({
    members: [
        {
            userId: 18442032,
            amount: 25
        }
    ],
    recurring: true,
    usePercentage: true
}).then( () => {
    console.log("Started payment process for the user(s)");
})

```

***

### postOnWall
##### wallMessage
Posts a message on the group wall

**Parameters**

- wallMessage (String) - The message to send

**Returns**

- Promise (Clas-WallPost)

**Example**
```JavaScript
.postOnWall("Hi folks").then( () => {
    console.log("sent new msg");
})
```


### postShout
##### newShout
Posts a new shout on the group

**Parameters**

- newShout (String) - The new shout to post

**Returns**

- Promise (Class-GroupShout)

**Example**
```JavaScript
.postShout("Welcome to my group :D").then( () => {
    console.log("New shout has been posted");
})
```

***

### promote
##### userId
Promotes a user (same as using changeRank(userId, 1))

**Parameters**
- userId (Number) - The id of the user to promote

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.promote(userId).then( () => {
    console.log("Promoted user");
})
```

***

### setAsPrimaryGroup
#####
Sets the group as the authenticated roblox user's primary

**Parameters**

- None

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.setAsPrimaryGroup().then( () => {
    console.log("Set group as primary");
})
```

***

### setRank
##### userId, roleId
Sets the user's rank to the role's id

**Parameters**

- userId (Number) - The id of the user to set the rank to the role
- roleId (Number) - The id of the role to promote the user to

**Returns**

- Promise (Boolean)

**Example**
```JavaScript
.setRank(18442032, 1231231).then( () => {
    console.log("Set user's rank");
})
```

***
***

## Properties

***

### description
The description of the group

### groupId 
The id of the group

### memberCount
The current member count of the group

### owner
(Class-PartialUser) The owner of the group

### shout
The current shout on the group

***