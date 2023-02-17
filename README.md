This repository is created for test purposes.

You only need to install `node` to run this code.

After you install node. You'll need to run the below command once:
`npm install`
    
This will install all the dependencies associated with the project.

You can run the code using the following command:
`npm start`
    or
`node index.js`
  
That's it! Enjoy using it.

P.S. It automatically connects to my MongoDB Cluster. So, if you want to connect to your local db you change the link in the mongoose.connect(...)
to: 'mongodb://localhost:27017/myapp' or if you want to connect it to your own cluster you can modify the link accordingly.


Please Note: This is not a full blogging website. Also, this code allows one user to be created multiple times and also allows one user to like multiple times the same post.

If you want to look at a fully functioning blogging website, you can head over to [My Blogging Website](https://blog-site17.onrender.com).
It takes some time for it to load as it is hosted on a free platform. Please be patient.


Functionality:

You can create a new user. You will be displayed with a user id. You will need to note it down or copy it somewhere for future use.
![image](https://user-images.githubusercontent.com/56663315/219653725-d46071f8-0156-49d8-a221-357734a62ca5.png)

You can then use the userid to get the user details as shown below:
![image](https://user-images.githubusercontent.com/56663315/219653870-aa954979-2c9a-4fad-9f8a-a26e7dbc7ae2.png)

You can create a post as shown below:
![image](https://user-images.githubusercontent.com/56663315/219653951-a3bdbbe6-3c54-4737-959b-86dc675a535e.png)

You can like a post and check if it is famous as shown below:
![image](https://user-images.githubusercontent.com/56663315/219654118-3846e31a-25b1-424f-82db-fbeccacbc4c4.png)
