import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "CJ",
    image:
      "https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/317432525_3010293279116565_498695074301600319_n.jpg?stp=cp6_dst-jpg&_nc_cat=106&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=hRIyjw53zEkAX-x-prO&_nc_ht=scontent-dfw5-2.xx&oh=00_AfBiIIB5jumGtgMQymMgS4C34NZx0WnUqPOnUmRqCFyKVQ&oe=657F3858",
    balance: -7,
  },
  {
    id: 933372,
    name: "Tony",
    image:
      "https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/340012017_2447266472121533_4273700429670192539_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=-1scO855tNQAX8ccQdz&_nc_ht=scontent-dfw5-2.xx&oh=00_AfAnZgoN1jFPN0cWJMA5rTpr52etCE_rYW6DERNGVqdpOA&oe=657E1E3D",
    balance: 20,
  },
  {
    id: 499476,
    name: "Jason",
    image:
      "https://scontent-dfw5-2.xx.fbcdn.net/v/t39.30808-6/336225975_1201576507132818_2441101160090227439_n.jpg?stp=cp6_dst-jpg&_nc_cat=100&ccb=1-7&_nc_sid=9c7eae&_nc_ohc=Eg8kFzai-nsAX-OHrW1&_nc_ht=scontent-dfw5-2.xx&oh=00_AfA_ZHhYsQdyynJv195IZKQutgP4JCm4X5YFV30C3rMQ2w&oe=657EADEC",
    balance: 0,
  },
];
function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList friends={friends} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <>
      <ul>
        {friends.map((friend) => (
          <Friend friend={friend} key={friend.id} />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend, key }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);

    setName("");
    setImage("");
  }
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>😎 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label>🤳🏻 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with x</h2>
      <label>💵 Bill amount</label>
      <input type="text" />
      <label>🙋🏼‍♂️ Your portion</label>
      <input type="text" />
      <label>😎 X's portion</label>
      <input type="text" disabled />
      <label>🤑 Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
    </form>
  );
}
export default App;
