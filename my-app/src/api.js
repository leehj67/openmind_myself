const BASE_URL = 'https://openmind-api.vercel.app/4-20';

export const createInterviewer = async name => {
  try {
    const response = await fetch(`${BASE_URL}/subjects/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        team: 'hyungjoo',
      }),
    });

    if (response.ok) {
      return response.json();
    }
    return new Error('');
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
  }
};

export async function getAllSubject(limit, offset, sort) {
  limit = limit || 8;
  offset = offset || 0;
  sort = sort || 'time';

  try {
    const response = await fetch(
      `${BASE_URL}/subjects/?limit=${limit}&offset=${offset}&sort=${sort}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // 네트워크 연결 오류 처리
    console.error('Network error:', error);
    return null;
  }
}

export async function getSubjectById(id) {
  try {
    const response = await fetch(`${BASE_URL}/subjects/${id}/`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // 네트워크 연결 오류 처리
    console.error('Network error:', error);
    return null;
  }
}

export async function getQuestionsById(id, limit, offset) {
  limit = limit || 8;
  offset = offset || 0;

  try {
    const response = await fetch(
      `${BASE_URL}/subjects/${id}/questions/?limit=${limit}&offset=${offset}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    // 네트워크 연결 오류 처리
    console.error('Network error:', error);
    return null;
  }
}

export async function postQuestionsReaction(id, type) {
  try {
    const response = await fetch(`${BASE_URL}/questions/${id}/reaction/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: type,
      }),
    });

    if (response.ok) {
      return response.json();
    }
    return new Error('');
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
  }
}

export async function createquestion(id, content) {
  try {
    const response = await fetch(`${BASE_URL}/subjects/${id}/questions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subjectId: id,
        content: content,
        like: 0,
        dislikeL: 0,
        team: '4-8',
        answer: {
          content: null,
          isRejected: true,
        },
      }),
    });

    if (response.ok) {
      return response.json();
    }
    return new Error('');
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
  }
}

export async function createAnswer(id, content, isRejected = false) {
  try {
    const response = await fetch(`${BASE_URL}/questions/${id}/answers/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        questionId: id,
        content: content,
        isRejected: isRejected,
        team: '8',
      }),
    });

    if (response.ok) {
      return response.json();
    }
    return new Error('');
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
  }
}

export async function deleteSubject(id) {
  try {
    const response = await fetch(`${BASE_URL}/subjects/${id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return;
    }
    return new Error('');
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
  }
}

export async function editAnswer(id, content, isRejected = false) {
  try {
    const response = await fetch(`${BASE_URL}/answers/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: content,
        isRejected: isRejected,
      }),
    });

    if (response.ok) {
      return response.json();
    }
    return new Error('');
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
  }
}

export async function deleteQuestion(id) {
  try {
    const response = await fetch(`${BASE_URL}/questions/${id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return;
    }
    return new Error('');
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
  }
}

export async function deleteAnswer(id) {
  try {
    const response = await fetch(`${BASE_URL}/answers/${id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      return;
    }
    return new Error('');
  } catch (e) {
    if (e instanceof Error) {
      return e;
    }
  }
}
