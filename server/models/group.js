const { ObjectId } = require('mongodb');

/**
 * Group Model for MongoDB operations
 */
class GroupModel {
  constructor() {
    this.collectionName = 'groups';
  }

  /**
   * Create a new group
   * @param {Object} db - MongoDB database instance
   * @param {Object} groupData - Group data
   * @returns {Object} Created group
   */
  async createGroup(db, groupData) {
    const collection = db.collection(this.collectionName);
    
    const group = {
      name: groupData.name,
      description: groupData.description || '',
      members: groupData.members || [], // Array of user IDs
      assessments: groupData.assessments || [], // Array of assessment IDs
      createdBy: groupData.createdBy,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(group);
    return { ...group, id: result.insertedId };
  }

  /**
   * Find all groups
   * @param {Object} db - MongoDB database instance
   * @returns {Array} Array of groups
   */
  async findAllGroups(db) {
    const collection = db.collection(this.collectionName);
    const groups = await collection.find({}).toArray();
    return groups.map(group => ({
      ...group,
      id: group._id,
      _id: undefined
    }));
  }

  /**
   * Find group by ID
   * @param {Object} db - MongoDB database instance
   * @param {string} groupId - Group ID
   * @returns {Object|null} Group object or null
   */
  async findGroupById(db, groupId) {
    const collection = db.collection(this.collectionName);
    
    if (!ObjectId.isValid(groupId)) {
      return null;
    }
    
    const group = await collection.findOne({ _id: new ObjectId(groupId) });
    if (!group) return null;
    
    return {
      ...group,
      id: group._id,
      _id: undefined
    };
  }

  /**
   * Find groups by user ID
   * @param {Object} db - MongoDB database instance
   * @param {string} userId - User ID
   * @returns {Array} Array of groups the user belongs to
   */
  async findGroupsByUserId(db, userId) {
    const collection = db.collection(this.collectionName);
    const groups = await collection.find({ 
      members: { $in: [userId] } 
    }).toArray();
    
    return groups.map(group => ({
      ...group,
      id: group._id,
      _id: undefined
    }));
  }

  /**
   * Update group
   * @param {Object} db - MongoDB database instance
   * @param {string} groupId - Group ID
   * @param {Object} updateData - Data to update
   * @returns {Object} Updated group
   */
  async updateGroup(db, groupId, updateData) {
    const collection = db.collection(this.collectionName);
    
    if (!ObjectId.isValid(groupId)) {
      return null;
    }
    
    const updateFields = {
      ...updateData,
      updatedAt: new Date()
    };
    
    // Remove undefined fields
    Object.keys(updateFields).forEach(key => {
      if (updateFields[key] === undefined) {
        delete updateFields[key];
      }
    });

    await collection.updateOne(
      { _id: new ObjectId(groupId) },
      { $set: updateFields }
    );

    return this.findGroupById(db, groupId);
  }

  /**
   * Add user to group
   * @param {Object} db - MongoDB database instance
   * @param {string} groupId - Group ID
   * @param {string} userId - User ID to add
   * @returns {Object} Updated group
   */
  async addUserToGroup(db, groupId, userId) {
    const collection = db.collection(this.collectionName);
    
    if (!ObjectId.isValid(groupId)) {
      return null;
    }
    
    await collection.updateOne(
      { _id: new ObjectId(groupId) },
      { 
        $addToSet: { members: userId },
        $set: { updatedAt: new Date() }
      }
    );

    return this.findGroupById(db, groupId);
  }

  /**
   * Remove user from group
   * @param {Object} db - MongoDB database instance
   * @param {string} groupId - Group ID
   * @param {string} userId - User ID to remove
   * @returns {Object} Updated group
   */
  async removeUserFromGroup(db, groupId, userId) {
    const collection = db.collection(this.collectionName);
    
    if (!ObjectId.isValid(groupId)) {
      return null;
    }
    
    await collection.updateOne(
      { _id: new ObjectId(groupId) },
      { 
        $pull: { members: userId },
        $set: { updatedAt: new Date() }
      }
    );

    return this.findGroupById(db, groupId);
  }

  /**
   * Add assessment to group
   * @param {Object} db - MongoDB database instance
   * @param {string} groupId - Group ID
   * @param {string} assessmentId - Assessment ID to add
   * @returns {Object} Updated group
   */
  async addAssessmentToGroup(db, groupId, assessmentId) {
    const collection = db.collection(this.collectionName);
    
    if (!ObjectId.isValid(groupId)) {
      return null;
    }
    
    await collection.updateOne(
      { _id: new ObjectId(groupId) },
      { 
        $addToSet: { assessments: assessmentId },
        $set: { updatedAt: new Date() }
      }
    );

    return this.findGroupById(db, groupId);
  }

  /**
   * Remove assessment from group
   * @param {Object} db - MongoDB database instance
   * @param {string} groupId - Group ID
   * @param {string} assessmentId - Assessment ID to remove
   * @returns {Object} Updated group
   */
  async removeAssessmentFromGroup(db, groupId, assessmentId) {
    const collection = db.collection(this.collectionName);
    
    if (!ObjectId.isValid(groupId)) {
      return null;
    }
    
    await collection.updateOne(
      { _id: new ObjectId(groupId) },
      { 
        $pull: { assessments: assessmentId },
        $set: { updatedAt: new Date() }
      }
    );

    return this.findGroupById(db, groupId);
  }

  /**
   * Delete group
   * @param {Object} db - MongoDB database instance
   * @param {string} groupId - Group ID
   * @returns {boolean} Success status
   */
  async deleteGroup(db, groupId) {
    const collection = db.collection(this.collectionName);
    
    if (!ObjectId.isValid(groupId)) {
      return false;
    }
    
    const result = await collection.deleteOne({ _id: new ObjectId(groupId) });
    return result.deletedCount > 0;
  }

  /**
   * Get groups with member details
   * @param {Object} db - MongoDB database instance
   * @returns {Array} Array of groups with populated member details
   */
  async getGroupsWithMembers(db) {
    const collection = db.collection(this.collectionName);
    const usersCollection = db.collection('users');
    
    const groups = await collection.find({}).toArray();
    
    // Populate member details for each group
    for (let group of groups) {
      if (group.members && group.members.length > 0) {
        // Filter out invalid ObjectIds and convert valid ones
        const validMemberIds = group.members
          .filter(id => ObjectId.isValid(id))
          .map(id => new ObjectId(id));
        
        const memberDetails = validMemberIds.length > 0 ? await usersCollection.find({
          _id: { $in: validMemberIds }
        }).toArray() : [];
        
        group.memberDetails = memberDetails.map(user => ({
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }));
      } else {
        group.memberDetails = [];
      }
    }
    
    return groups.map(group => ({
      ...group,
      id: group._id,
      _id: undefined
    }));
  }
}

module.exports = new GroupModel();
