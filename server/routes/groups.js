const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const groupModel = require('../models/group');
const userModel = require('../models/user');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// Role constants
const ADMIN_ROLES = ['sysAdmin', 'assessment_admin'];
const SYS_ADMIN_ONLY = ['sysAdmin'];

/**
 * @route GET /api/groups
 * @desc Get all groups
 * @access Admin only
 */
router.get('/', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    const groups = await groupModel.getGroupsWithMembers(req.app.locals.db);
    res.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch groups' 
    });
  }
});

/**
 * @route GET /api/groups/:id
 * @desc Get group by ID
 * @access Admin only
 */
router.get('/:id', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    const group = await groupModel.findGroupById(req.app.locals.db, req.params.id);
    if (!group) {
      return res.status(404).json({ 
        success: false, 
        message: 'Group not found' 
      });
    }
    res.json({ 
      success: true, 
      data: group 
    });
  } catch (error) {
    console.error('Error fetching group:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch group' 
    });
  }
});

/**
 * @route POST /api/groups
 * @desc Create new group
 * @access sysAdmin only
 */
router.post('/', authenticateToken, authorizeRole(SYS_ADMIN_ONLY), async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Group name is required' 
      });
    }

    const groupData = {
      name: name.trim(),
      description: description ? description.trim() : '',
      createdBy: req.user.id
    };

    const group = await groupModel.createGroup(req.app.locals.db, groupData);
    res.status(201).json({ 
      success: true, 
      message: 'Group created successfully',
      group 
    });
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create group' 
    });
  }
});

/**
 * @route PUT /api/groups/:id
 * @desc Update group
 * @access sysAdmin only
 */
router.put('/:id', authenticateToken, authorizeRole(SYS_ADMIN_ONLY), async (req, res) => {
  try {
    const { name, description } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ 
        success: false, 
        message: 'Group name is required' 
      });
    }

    const updateData = {
      name: name.trim(),
      description: description ? description.trim() : ''
    };

    const group = await groupModel.updateGroup(req.app.locals.db, req.params.id, updateData);
    if (!group) {
      return res.status(404).json({ 
        success: false, 
        message: 'Group not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Group updated successfully',
      group 
    });
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update group' 
    });
  }
});

/**
 * @route DELETE /api/groups/:id
 * @desc Delete group
 * @access sysAdmin only
 */
router.delete('/:id', authenticateToken, authorizeRole(SYS_ADMIN_ONLY), async (req, res) => {
  try {
    const success = await groupModel.deleteGroup(req.app.locals.db, req.params.id);
    if (!success) {
      return res.status(404).json({ 
        success: false, 
        message: 'Group not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Group deleted successfully' 
    });
  } catch (error) {
    console.error('Error deleting group:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete group' 
    });
  }
});

/**
 * @route POST /api/groups/:id/members
 * @desc Add user to group
 * @access Admin only
 */
router.post('/:id/members', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ 
        success: false, 
        message: 'User ID is required' 
      });
    }

    // Verify user exists
    const user = await userModel.findUserById(req.app.locals.db, userId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    const group = await groupModel.addUserToGroup(req.app.locals.db, req.params.id, userId);
    if (!group) {
      return res.status(404).json({ 
        success: false, 
        message: 'Group not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'User added to group successfully',
      group 
    });
  } catch (error) {
    console.error('Error adding user to group:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add user to group' 
    });
  }
});

/**
 * @route DELETE /api/groups/:id/members/:userId
 * @desc Remove user from group
 * @access Admin only
 */
router.delete('/:id/members/:userId', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    const group = await groupModel.removeUserFromGroup(req.app.locals.db, req.params.id, req.params.userId);
    if (!group) {
      return res.status(404).json({ 
        success: false, 
        message: 'Group not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'User removed from group successfully',
      group 
    });
  } catch (error) {
    console.error('Error removing user from group:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to remove user from group' 
    });
  }
});

/**
 * @route POST /api/groups/:id/assessments
 * @desc Add assessment to group
 * @access Admin only
 */
router.post('/:id/assessments', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    const { assessmentId } = req.body;
    
    if (!assessmentId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Assessment ID is required' 
      });
    }

    const group = await groupModel.addAssessmentToGroup(req.app.locals.db, req.params.id, assessmentId);
    if (!group) {
      return res.status(404).json({ 
        success: false, 
        message: 'Group not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Assessment added to group successfully',
      group 
    });
  } catch (error) {
    console.error('Error adding assessment to group:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to add assessment to group' 
    });
  }
});

/**
 * @route DELETE /api/groups/:id/assessments/:assessmentId
 * @desc Remove assessment from group
 * @access Admin only
 */
router.delete('/:id/assessments/:assessmentId', authenticateToken, authorizeRole(ADMIN_ROLES), async (req, res) => {
  try {
    const group = await groupModel.removeAssessmentFromGroup(req.app.locals.db, req.params.id, req.params.assessmentId);
    if (!group) {
      return res.status(404).json({ 
        success: false, 
        message: 'Group not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Assessment removed from group successfully',
      group 
    });
  } catch (error) {
    console.error('Error removing assessment from group:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to remove assessment from group' 
    });
  }
});

/**
 * @route GET /api/groups/user/:userId
 * @desc Get groups for a specific user
 * @access Admin only or own user
 */
router.get('/user/:userId', authenticateToken, async (req, res) => {
  try {
    const requestedUserId = req.params.userId;
    
    // Allow users to see their own groups, or admins to see any user's groups
    if (req.user.id !== requestedUserId && !ADMIN_ROLES.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied' 
      });
    }

    const groups = await groupModel.findGroupsByUserId(req.app.locals.db, requestedUserId);
    res.json(groups);
  } catch (error) {
    console.error('Error fetching user groups:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch user groups' 
    });
  }
});

module.exports = router;
