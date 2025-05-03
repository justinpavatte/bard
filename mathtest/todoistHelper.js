const TodoistHelper = (() => {
    const BASE_URL = 'https://api.todoist.com/rest/v2';
    const TOKEN = '8972a19cadcc698cf4843761485fd359165c061b';
    const PROJECT_ID = '6Xv92Wq4wCmhqP86';

    async function request(endpoint, method, body) {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: body ? JSON.stringify(body) : undefined
        });
    
        if (!response.ok) {
            throw new Error(`Todoist API error: ${response.status} ${response.statusText}`);
        }
    
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            return null;
        }
    }

    async function createTask(text) {
        const task = await request('/tasks', 'POST', { project_id: PROJECT_ID, content: text });
        return task.id;
    }

    async function createTaskInSection(sectionId, text) {
        const task = await request('/tasks', 'POST', {
            project_id: PROJECT_ID,
            section_id: sectionId,
            content: text
        });
        return task.id;
    }

    async function createComment(taskId, comment) {
        return request('/comments', 'POST', { task_id: taskId, content: comment });
    }

    async function completeTask(taskId) {
        await request(`/tasks/${taskId}/close`, 'POST');
    }

    async function taskExists(taskId) {
        try {
            const task = await request(`/tasks/${taskId}`, 'GET');
            if (task.is_completed) {
                return false; // Treat completed tasks as non-existent
            }
            return true;
        } catch (e) {
            if (e.message.startsWith('Todoist API error: 404')) {
                return false;
            }
            throw e;
        }
    }
    
    return {
        createTask,
        createTaskInSection,
        createComment,
        completeTask,
        taskExists
    };
    
})();
