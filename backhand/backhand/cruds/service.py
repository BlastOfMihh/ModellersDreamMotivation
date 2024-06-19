from .repo import Repo
from .domain.user import User
from .domain.contest import Contest, ContestStates
from .domain.submission import Submission


class Service:
    def __init__(self, repo:Repo):
        self.repo=repo

    def user_vote(self, user_id, to_user_id, contest_id, grade):
        user=self.user_get(user_id)

        return 


    def contest_get(self, id):
        return self.repo.contest_get(id)
    
    def contest_get_page(self, index, page_size):
        return self.repo.get_contests_page(index=1, page_size=100)

    def contest_add(self, name, task, max_participants_count, start_time, end_time):
        contest=Contest(name, max_participants_count, task, start_time, end_time)
        return self.repo.contest_add(contest)

    def contest_update(self,id, name, task, max_participants_count, start_time, end_time):
        contest=Contest(name, max_participants_count, task, start_time, end_time)
        return self.repo.contest_update(id, contest)


    def submission_add(self, user_id, contest_id, binary_model):
        submmision=Submission(user_id, contest_id, binary_model)
        print(submmision)
        return self.repo.submission_add(submmision)
    

    def get_model(self, submission_id):
        return self.repo.get_model(submission_id)
    
    def submission_get_page(self, index=1, page_size=100):
        return self.repo.submissions_get_page()

    def participant_add(self, user_id, contest_id):
        contest=self.contest_get(contest_id)
        user=self.user_get(user_id)
        if contest.get_state()==ContestStates.BEFORE_START:
            return self.repo.participant_add(user_id, contest_id)
        else :
            raise Exception('You can enroll only before the contest has started')
    

    def get_user_submissions(self, user_id, contest_id):
        return self.repo.get_user_submissions(user_id, contest_id)


    # user code 
    def user_add(self, username, user_type, is_active, password):
        new_user = User(username, user_type, is_active, password)
        self.repo.add(new_user)
    
    def user_remove(self, id):
        self.repo.user_remove(id)

    def user_update(self, id, username, user_type, is_active, password):
        updated_user = User(username, user_type, is_active, password)
        self.repo.user_update(id, updated_user)

    def user_get(self, id):
        user = self.repo.user_get(id)
        return {
            "username": user.username,
            "email": user.email,
        }

    def get_all_users(self, page=1, per_page=10):
        return self.repo.get_all_users(page, per_page)