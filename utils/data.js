const usernames = [
    'kuzco',
    'malina',
    'homer',
    'marge',
    'bart',
    'lisa',
    'maggie',
    'nedflanders',
    'milhouse',
    'martinprince',
    'nelsonmuntz',
    'ralphwiggum'];

    const thoughtsArray = [
"I love cheese, you know? It's like a fine cigar. You take your time with it",
"There's something about a good cheese that just makes life better, you know?",
"They say cheese is good for your bones, but I say it's good for your soul.",
"Some people say that cheese and tobacco don't mix, but I disagree. There's a reason they call it a pairing",  
"take a bite of that cheese, then take a puff of that rich, smooth cigar. It's like the world just stops for a moment",
"When it comes to cheese, I like it like I like my tobacco: full-bodied and flavorful",
"I've always said that there's nothing in this world that can't be improved with a little cheese or tobacco",
"Life is too short to eat bad cheese or smoke bad cigars",
"A good cheese, a fine cigar, a nice glass of wine. It's all about enjoying the little things.",
"I like to keep things simple. Give me a good aged cheddar or a creamy brie, and I'm a happy man",
"nothing quite like a good cheese board. You got creamy brie, tangy blue cheese, spicy gouda"];

        const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

        const getRandomUser = () => {
            return getRandomItem(usernames);
        }

         module.exports = {usernames, thoughtsArray, getRandomItem, getRandomUser};