## Bloxy_noAuth class

This page documents all methods of the Bloxy_noAuth class

***

[](#top)
 - **[Methods](#methods)**
    ***
    - [acceptFriendRequest](#acceptfriendrequest)
    - [addDeveloperProduct](#adddeveloperproduct)
    - [archiveMessages](#archivemessages)
    - [blockUser](#blockuser)
    - [buyAsset](#buyasset)
    - [canManageAsset](#canmanageasset)
    - [changeBlurb](#changeblurb)
    - [changeStatus](#changestatus)
    - [configureItem](#configureitem)
    - [declineFriendRequest](#declinefriendrequest)
    - [followUser](#followuser)
    - [friendUser](#frienduser)
    - [getArchivedMessages](#getarchivedmessages)
    - [getVerificationStatus](#getverificationstatus)
    - [getCurrency](#getcurrency)
    - [getFollowers](#getfollowers)
    - [getFollowing](#getfollowing)
    - [getFriendRequests](#getfriendrequests)
    - [getFriends](#getfriends)
    - [getFriendsOnline](#getfriendsonline)
    - [getGroup](#getgroup)
    - [getGroupsIManage](#getgroupsimanage)
    - [getIdByUsername](#getidbyusername)
    - [getMessageById](#getmessagebyid)
    - [getMessages](#getmessages)
    - [getNumFriends](#getnumfriends)
    - [getProductInfo](#getproductinfo)
    - [getUser](#getuser)
    - [getUserGroups](#getusergroups)
    - [getUsernameById](#getusernamebyid)
    - [getUserPrimaryGroup](#getuserprimarygroup)
    - [getUserRobloxBadges](#getuserrobloxbadges)
    - [isFriends](#isfriends)
    - [isNameTaken](#isnametaken)
    - [login](#login)
    - [markMessagesRead](#markmessagesread)
    - [markMessagesUnread](#markmessagesunread)
    - [messageUser](#messageuser)
    - [moveMessagesToInbox](#movemessagestoinbox)
    - [ownsAsset](#ownsasset)
    - [redeemPromoCode](#redeempromocode)
    - [searchUsers](#searchusers)
    - [searchGroups](#searchgroups)
    - [unblockUser](#unblockuser)
    - [unfollowUser](#unfollowuser)
    - [unfriendUser](#unfriendUser)
    - [uploadAsset](#uploadasset)
    - [setCacheDuration](#setcacheduration)
    - [setProxy](#setproxy)
    - [_request](#_request)
 - **[Events](#events)**
    ***
    - [ready](#ready)
    - [assetAdded](#assetadded)
    - [assetRemoved](#assetremoved)
    - [conversationRemoved](#conversationremoved)
    - [friendRequestReceived](#friendrequestreceived)
    - [friendRequestSent](#friendrequestsent)
    - [lostFriend](#lostfriend)
    - [message](#message)
    - [messageArchived](#messagearchived)
    - [messageRead](#messageread)
    - [messageUnarchived](#messageunarchived)
    - [messageUnread](#messageunread)
    - [notification](#notification)
    - [presenceChanged](#presencechanged)

***



## Methods
***
### acceptFriendRequest
##### userId
Accepts a friend request from the user (Must be signed in)

**Parameters**
- userId (Number)

**Returns**
- promise (Boolean)

**Example**
```JavaScript
.acceptFriendRequest(1).then( () => {

})
```

***

### addDeveloperProduct
##### options
Adds a developer product to a game (Must be signed in)

**Parameters**
- options (Object)
- options.name (String)
- options.description (String)
- options.universeId (Number)
- options.price (Number)

**Returns**
- Promise (ProductId)

**Example**
```JavaScript
.addDeveloperProduct({
    name: 'test',
    description: 'test',
    universeId: 1,
    price: 69
}).then(productId=>{

})
```

***

### archiveMessages
##### array[messageId]
Archives messages identified by their id (Must be signed in)

**Parameters**
- array[messageId]

**Returns**
- Promise (boolean)

**Example**
```JavaScript
.archiveMessages([1,2,3]).then( () => {

})
```

***

### blockUser
##### userId
Blocks a user from the authenticated user (Must be signed in)

**Parameters**
- userId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.blockUser(1).then( () => {

})
```

***

### buyAsset
##### productId, expectedPrice, sellerId
Buys an asset (Must be signed in)

**Parameters**
- productId (Number)
- expectedPrice (Number)
- sellerId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.buyAsset(1,2,3).then( () => {

})
```

***

### canManageAsset
##### userId, assetId
Checks if the user (identified by userId) can manage the asset (identified by its id) 

**Parameters**
- userId (Number)
- assetId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.canManageAsset(1, 2).then(canManage=>{
    console.log("Can manage: " + canManage)
})
```

***

### changeBlurb
##### newblurb
Updates the authenticated user's blurb. (Account PIN must be disabled for it to work) (Must be signed in)

**Parameters**
- newBlurb (String)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.changeBlurb("Hello, world!").then( () => {

})
```

***

### changeStatus
##### newStatus
Updates the authenticated user's status. (Must be signed in)

**Parameters**
- newStatus (String)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.changeStatus("Hello, world!").then( () => {
    
})
```

***

### configureItem
##### options
Configures an existing asset. (Must be signed in)

**Parameters**
- options (Object)
- options.assetId (Number)
- options.title (String)
- options.description (String)
- options.enableComments (Boolean)
- options.sellForRobux (Number)
- options.genreSelection (String)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.configureItem({
    assetId: 1,
    title: "test",
    sellForRobux: 69
}).then( () => {

})
```

***

### declineFriendRequest
##### userId
Declines a friend request from the user (Must be signed in)

**Parameters**
- userId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.declineFriendRequest(1).then( () => {

})
```

***

### followUser
##### userId
Follows a user with the authenticated user. (Must be signed in)

**Parameters**
- userId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.followUser(1).then( () => {

})
```

***

### friendUser
##### userId
Sends a friend request to the user. Note that you are prone to get captcha'd if you use this a lot or if you're using a recently made account (<2 years) (Must be signed in)

**Parameters**
- userId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.friendUser(1).then( () => {

})
```

***

### getArchivedMessages 
##### options
Gets messages that are archived belonging to the authenticated user (Must be signed in)

**Parameters**
- options (Object)
- options.page (Number)
- options.limit (Number)

**Returns**
- Promise (Array[Class-RobloxMessage])

**Example**
```JavaScript
.getArchivedMessages({
    page: 1,
    limit: 20
}).then(messages=>{

})
```

***

### getVerificationStatus
##### identifier, platform
Gets the user's verification status using Eryn's API ([link here](https://verify.eryn.io/api))

**PLEASE** Respect the API's ratelimits by sending **MAXIMUM 60 requests per 60 seconds**
Bloxy has a local "prevention" to make sure you don't exceed this. Removing it and exceeding the limits will get you blocked from using her API.

**Parameters**
- identifier (Number) - The UserId for either roblox or discord
- (*optional*) platform (String) - Either "roblox" or "discord", default: "roblox"

**Returns**
- Promise (Class-RoVerResponseDiscord | Class-RoVerResponseRoblox)

**Example**
```JavaScript
// Getting verification status using Roblox userid
.getVerificationStatus(18442032).then(status=>{
    console.log(status);
})

// Getting verification status using Discord userId
.getVerificationStatus('211122613429338112', 'discord').then(status=>{
    console.log(status);
})

```

***

### getCurrency
##### 
Gets the authenticated user's amount of Robux (you don't get free robux :face_palm:) (Must be signed in)

**Parameters**

none

**Returns**
- Promise (Number)

**Example**
```JavaScript
.getCurrency().then(robux=>{
    console.log(robux);
})
```

***

### getFollowers
##### options
Gets the user's followers, optional with page to retrieve

**Parameters**
- options (Object)
- options.userId (Number)
- options.page (Number)

**Returns**
- Promise (Object)
- Object {
    * userId: Number,
    * totalFollowers: Number,
    * currentPage: Number,
    * totalPages: Number,
    * friendsType: String,
    * followers: Array[Class-PartialUser]
}

**Example**
```JavaScript
.getFollowers({userId: 1}).then(response=>{
    console.log("Total followers: " + response.totalFollowers);
    response.followers.forEach(follower=>{
        console.log(follower);
    })
})
```


***


### getFollowing
##### options
Gets the users the user (identified by their userId) is following

**Parameters**
- options (Object)
- options.userId (Number)
- options.page (Number)

**Returns**
- Promise<Object>
- Object {
    * userId: Number
    * totalFollowers: Number
    * currentPage: Number
    * pageSize: Number
    * totalPages: Number
    * friendsType: String
    * following: Array<Follower>
}

**Example**

```JavaScript
.getFollowing(18442032, 2).then(response=>{
    console.log("Total followers: " + response.totalFollowers);
    response.following.forEach(following=>{
        console.log(following);
    })
})
```


***


### getFriendRequests
##### (page)
Gets the authenticated user's friend requests (Must be signed in)

**Parameters**
- (*optional*) page (Number)

**Returns**
- Promise (Array[Class-JoinRequest])

**Example**
```JavaScript
.getFriendRequests(2).then(friendRequests => {
    
})
```

***


### getFriends
##### options
Gets the user's friends (identified by userId)

**Parameters**
- options (Number)
- options.userId (Number)
- (*optional*) options.page (Number)

**Returns**
- Promise (Array[Class-PartialUser])

**Example**
```JavaScript
.getFriends({
    userId: 1,
    page: 2
}).then(friends=>{
    // get first in the array
    let getFriend = friends.shift();
    console.log(getFriend.username);
})
```


***

### getFriendsOnline 
##### 
Gets the authenticated user's online friends. (Must be signed in)

**Parameters**

None

**Returns**
- Promise (Array[PartialUser])

**Example**
```JavaScript
.getFriendsOnline().then(friends=>{
    console.log(friends);
})
```

***


### getGroup
##### groupId
Gets a group specified by its id

**Parameters**
- groupId (Number)

**Returns**
- Promise (Class-Group)

**Examples**
```JavaScript
.getGroup(1).then(group=>{

})
```

***


### getGroupsIManage
#####
Gets all the groups that the authenticated user can manage.

**Parameters**

None

**Returns**
- Promise (Array[Class-PartialGroup])

**Example**
```JavaScript
.getGroupsIManage().then(groups=>{

})
```

*** 

### getIdByUsername
##### username
Gets a user's userId from their username

**Parameters**
- username (String)

**Returns**
- Promise (Number)

**Example**
```JavaScript
.getIdByUsername('CodeTheIdiot').then(userId=>{
    
})
```

***


### getMessageById
##### messageId
Gets a message by the id

**Parameters**
- messageId (number)

**Returns**
- Promise (Class-RobloxMessage)

**Example**
```JavaScript
.getMessageById(23213).then(message=>{

})
```

***

### getMessages
##### options
Gets messages in the authenticated user's inbox

**Paramaters**
- options (Object)
- (*optional*) options.page (Number)
- (*optional*) options.limit (Number)

**Returns**
- Promise (Array[Class-RobloxMessage])

**Example**
```JavaScript
.getMessages({
    page: 2,
    limit: 20
}).then(messages=>{

})
```

*** 


### getNumFriends
###### userId
Gets the user's total amount of friends (identified by their userId)

**Parameters**
- userId (Number)

**Returns**
- Promise (Number)

**Example**
```JavaScript
.getNumFriends(18442032).then(totalFriends=>{
    console.log("Total amount of friends: " + totalFriends);
})
```


***

### getProductInfo
##### assetId
Gets information about a product/asset

**Parameters**
- assetId (Number)

**Returns**
- Promise (Class-ProductInfo)

**Example**
```JavaScript
.getProductInfo(1).then(info=>{

})
```


***

### getUser
##### identifier (userId | username), specified
Gets a user either by userId or name

**Parameters**
- userId (Number) OR username (String)
- (specified) (String: 'username' | 'userId')

**Returns**
- Promise (Class-RobloxUser)

**Example**
```JavaScript
// Get user by id without specifying
// Must provide number
.getUser(18442032)
// Get user by name
.getUser('CodeTheIdiot')
// Get user by name, when the name is numbers etc.
.getUser(132, 'username')
```


***

### getUserGroups
##### userId
Gets the user's groups (identified by their userId)

**Parameters**
- userId (Number)

**Returns**
- Promise (Array[Classes-UserGroup])

**Example**
```JavaScript
.getUserGroups(18442032).then(groups=>{
    let firstGroup = groups.shift();
    console.log("Group name: " + firstGroup.partialGroup.name)
})
```


*** 

### getUsernameById
##### userId
Gets the user's username from their userId

**Parameters**
- userId (Number)

**Returns**
- Promise (String)

**Example**
```JavaScript
.getUsernameById(18442032).then(username=>{
    
})
```

***



### getUserPrimaryGroup
##### userId
Gets the user's primary group (if any)

**Parameters**
- userId (Number)

**Returns** 
- Promise (Class-UserGroup || null)

**Example**
```JavaScript
.getUserPrimaryGroup(18442032).then(primaryGroup=>{
    if (primaryGroup) {
        console.log("Group id: " + primaryGroup.partialGroup.groupId);
    }
})
```


***


### getUserRobloxBadges
##### userId
Gets the user's roblox badges

**Parameters**
- userId (Number)

**Returns**
- Promise (Array[Class-RobloxBadge])

**Example**
```JavaScript
.getUserRobloxBadges(18442032).then(badges=>{
    console.log(badges)
})
```

***


***

### isFriends
##### userId1, userId2
Checks if two users are friends or not identified by their userIds

**Parameters**
- userId1 (Number)
- userId2 (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.isFriends(1, 18442032).then(isFriends=>{
    //isFriends = false because Roblox is not friends with me D:
    console.log(isFriends);
})
```


***


### isNameTaken
##### nme
Checks if the username is taken or not

**Parameters**
- username (String)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.isNameTaken('roblox').then(isTaken=>{
    console.log("Is taken: " + isTaken);
})
```

***


### login
##### (settings)
Logs in using provided credentials (either when initializing the bloxy client, or the settings when calling this method)

**Parameters**
- settings (Object)
- settings.type What to sign in with (username, email, phone)
- settings.value The value of what you chose to sign in with (username, email, phone)
- settings.password The password of the account
- settings.cookie If you'd like to login using the .ROBLOSECURITY cookie, then all you have to provide is that. For more information check the Getting started guide

**Returns**

null

**Example**
```JavaScript
.login();

.login({
    username: 'Username',
    password: 'Password'
});

.login({
    cookie: '.ROBLOSECURITY Contents'
});

.login({
    CaptchaKey: 'Get the api key at https://2captcha.com?from=6229671
});
```


***


### markMessagesRead
##### array
Marks the messages provided as read

**Parameters**
- array (Array)
- array.messageId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.markMessagesRead([1,2,3]).then( () => {

})
```

***


### markMessagesUnread
##### array
Marks the messages provided as unread

**Parameters**
- array (Array)
- array.messageId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.markMessagesUnread([1,2,3]).then( () => {

})
```

***


### messageUser
##### options
Messages a user on through the authenticated user

**Parameters**
- options (Object)
- options.subject (String)
- options.body (string)
- options.recipientId (string)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.messageUser({
    subject: 'Hello world!',
    body: 'Bye world!',
    recipientId: 1
}).then( () => {

})
```

***

### moveMessagesToInbox
##### array
Moves provided messages to the inbox (from the archive)

**Parameters**
- array (Array[MessageId | Class-RobloxMessage])

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.moveMessagesToInbox([1,2,3]).then( () => {

})
```

***


### ownsAsset
##### userId, assetId
Checks if the user owns the asset identified by their ids

**Parameters**
- userId (Number)
- assetId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.ownsAsset(18442032, 6969699).then(ownsAsset=>{
    console.log("Owns asset: " + ownsAsset);
})
```


***


### redeemPromoCode
##### code
Redeems a promo code

**Parameters**
- code (String)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.redeemPromoCode("!HAPPY12BIRTHDAYROBLOX!").then( () => {

})
```

***

### searchGroups
##### query
Search on Roblox for groups

**Parameters**
- query (String)

**Returns**
- Promise (Object)
- Object {
    keyword: String
    startRow: Number
    maxRows: Number
    totalResults: Number
    searchKeywordMinLength: Number
    results: Array[Class-GroupSearchResult]
}

**Example**
```JavaScript
.searchGroups('exabyte').then(response=>{
    
})
```

***

### searchUsers
##### query
Search on Roblox for users

**Parameters**
- query (String)

**Returns**
- Promise (Array[Class-PartialUser])

**Example**
```JavaScript
.searchUsers('builderman').then(users=>{

})
```

***

### searchUsers
##### query, startIndex
Searches for users, starting from the `startIndex` provided or 0

**Parameters**
- query (String)
- (startIndex) (Number)

**Returns**
- Promise (ResultsUserSearch)
- Object {
    * maxRows: Number
    * query: String
    * results: Array[Class-UserSearchResult]
    * startIndex: Number
    * totalResults: Number
}

**Examples**
```JavaScript
.searchUsers('builderman').then(response=>{
    console.log("Total results: " + response.totalResults);
})
```

***

### unblockUser
##### userId
Unblocks a user from the authenticated user

**Parameters**
- userId (NumberId)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.unblockUser(18442302).then( () => {

})
```

***

### unfollowUser
##### userId
Unfollows a user from the authenticated user

**Parameters**
- userId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.unfollowUser(18442032).then( () => {

})
```

***

### unfriendUser
##### userId
Unfriends a user from the authenticated user

**Parameters**
- userId (Number)

**Returns**
- Promise (Boolean)

**Example**
```JavaScript
.unfriendUser(18442032).then( () => {

})
```

***

### uploadAsset
##### options
Uploads an asset to Roblox either as the authenticated user or as a group (specified by id)

**Parameters**
- options (Object)
- options.name (String)
- options.assetTypeId (Number)
- (*optional*) options.groupId (Number)
- options.file (String) -- The path to the file you want to upload
- (*optional*) options.fileName (String)
- (*optional*) options.contentType (String) -- Don't set this to anything unless you know what you're doing

**Returns**
- Promise (ProductId | AssetId)

**Example**
```JavaScript
.uploadAsset({
    name: 'test',
    assetTypeId: 11, // shirt
    file: './path/to/file.png'
}).then(assetId=>{
    
})
```

***

### setCacheDuration
##### options
Sets the duration for caching

**Parameters**
- options (Object)
- options.user (Number) - (in hours) duration of how long the caching should be for when using .getUser, default: .5
- options.group (Number) - (in hours) how long the cache should last when using .getGroup, default: 2
- options.getIdByUsername (Number) - (in hours) how long the cache should last, default: permanent

**Returns**
- Promise ()

**Example**
```JavaScript
.setCacheDuration({
    user: .1,
    group: 0,
    getIdByUsername: null
}).then( () => {

})
```


***


### setProxy
##### *(url)*
Sets the new proxy (or removes current one by providing null)

**Parameters**
- url (String | null) - The new proxy or null to remove current proxy

**Returns**

- Nothing

**Example**
```JavaScript
.setProxy('http://proxy-service:abc@def.ghi-jkl.com:12345')
```


### _request
##### url, *(options*)
Performs a request from the current client

**Paramaters**
- url (String) - The URL ([Uniform Resource Locator](https://en.wikipedia.org/wiki/URL)) to a website (aka. [https://www.roblox.com](https://www.roblox.com/))
- *options (Object)* - If you want to add some extra options to the request
- *options.body (Any)* (Look up at [request](https://www.npmjs.com/package/request))
- *options.form (Any)* (Look up at [request](https://www.npmjs.com/package/request))
- *options.formData (Any)* (Look up at [request](https://www.npmjs.com/package/request))
- *options.json (Object)* (Look up at [request](https://www.npmjs.com/package/request))
- *options.method (String)* (Look up at [request](https://www.npmjs.com/package/request))


**Returns**
- Promise (Object)
- Object.res
- Object.jar
- Object.xcsrf

**Example**
```JavaScript
._request('https://www.roblox.com/', {
    method:" GET"
}).then(returned=>{

})
```

***

### getVerificationStatus
##### userId, *(platform)*
Uses [Eryn's](https://eryn.io/) [api](https://verify.eryn.io/api) to get a user's verification status.

**Parameters**

- userId (Number | String) - Either the user's roblox id or discord user id
- *platform (String)* - Either 'roblox' or 'discord'

**Returns**

- Class-RoVerResponseDiscord


**Example**
```JavaScript
.getVerificationStatus('18442032', 'roblox').then(status=>{
    console.log(status);
})
```


***
***


## Events

***

Listen to events using `bloxyClient.on('eventName', function(callback1) {})`
Callback values will be under the event name.

### ready 
##### *(callback values*)
Fired whenever the bloxy client has signed in. If you have 2FA enabled, you need to follow [this guide here](https://github.com/MartinRBX/bloxy/wiki/Using-2FA-(two-factor-authentication)). Do not use any methods that require you to be signed in (friendUser, messageUser etc.)


**Callback values**


**Example**
```JavaScript
.on('ready', function() {
    console.log("Logged in");
})
```

***

### assetAdded
##### *(callback values*) assetTypeId, assetId
Fired whenever the authenticated roblox user has received a new roblox item (hat, any item in the catalog etc.)

**Callback values**

- assetTypeId (Number) - The type of the asset (an id)
- assetId (Number) - The id of the asset

**Example**
```JavaScript
.on('assetAdded', function (typeId, assetId) {
    console.log(`Received asset ${assetId} which is type: ${typeId}`)
})
```

***

### assetRemoved
##### assetTypeId, assetId
Fired whenever the authenticated roblox user lost an item that they previously owned

**Callback values**

- assetTypeId (Number)
- assetId (Number)

**Example**
```JavaScript
.on('assetRemoved', function (typeId, assetId) {
    console.log(`Lost asset ${assetId} which was type ${typeId}`)
})
```

***


### conversationRemoved
##### conversationId
Fired usually when unfriending users, you will lose the conversation with them

**Callback values**

- conversationId (Number) - The id of the conversation you had between you and the user

**Example**
```JavaScript
.on('conversationRemoved', function (conversationId) {
    console.log(`Lost conversation ${conversationId}`)
})
```

***

### friendRequestReceived
##### userId
Fired whenever a user sends a friend request to you

**Callback values**

- userId (Number) - The id of the user who sent the friend request

**Example**
```JavaScript
.on('friendRequestReceived', function (userId) {
    console.log(`User ${userId} sent a friend request`)
})
```

***

### friendRequestSent
##### userId
Fired when you send a friend request to someone

**Callback values**

- userId (Number) - The id of the user you sent the friend request to

**Example**
```JavaScript
.on('friendRequestSent', function (userId) {
    console.log(`Sent a friend request to ${userId}`)
})
```

***


### lostFriend
##### userId
Fired when the authenticated roblox user loses a friend (aka. unfriend)

**Callback values**

- userId (Number) - The id of the user that you were unfriended with

**Example**
```JavaScript
.on('lostFriend', function (userId) {
    console.log(`Lost ${userId} as friend!`)
})
```

***

### message
##### messageId
Fired when the authenticated roblox user receives a new message

**Callback values**

- messageId (Number) - The id of the message that you just received

**Example**
```JavaScript
.on('message', function(messageId) {
    console.log(`Received new message with id ${messageId}`)
})
```

***

### messageArchived
##### messageId
Fired when a message has been moved from the inbox to the archive on the authenticated roblox user

**Callback values**

- messageId (Number) - The id of the message that was archived

**Example**
```JavaScript
.on('messageArchived', function (messageId) {
    console.log(`Archived message ${messageId}`)
})
```

***

### messageRead
##### messageId
Fired when the authenticated user has acknowledged to read a message (aka. just read one) or marked as read

**Callback values**

- messageId (Number) - The id of the message that was just read

**Example**
```JavaScript
.on('messageRead', function (messageId) {
    console.log(`Read message ${messageId}`)
})
```

***

### messageUnarchived
##### messageId
Fired when a message has been moved from the archive to the inbox

**Callback values**

- messageId (Number) - The id of the message that was moved to the inbox

**Example**
```JavaScript
.on('messageUnarchived', function(messageId) {
    console.log(`Message ${messageId} was unarchived`)
})
```

***

### messageUnread
##### messageId
Fired when a message has been marked as unread

**Callback values**

- messageId (Number) - The id of the message that was marked as unread

**Example**
```JavaScript
.on('messageUnread', function (messageId) {
    console.log(`Message ${messageId} was marked as unread`)
})
```

***

### presenceChanged
##### userId
Fired when one of the authenticated roblox user's friends have had their presence changed (stopped using studio, started a game etc.)

**Callback values**

- userId (Number) - The id of the user that had their presence changed

**Example**
```JavaScript
.on('presenceChanged', function (userId) {
    console.log(`User ${userId} had their presence changed`)
})
```

***