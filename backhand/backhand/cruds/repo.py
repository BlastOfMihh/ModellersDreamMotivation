from faker import Faker
from .domain.user import User
from .domain.contest import Contest
from .domain.submission import Submission
from .domain.participant import Participant
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc, and_

class Repo:
    def __init__(self, db:SQLAlchemy) -> None:
        self.db=db

    def contest_get(id):
        return Contest.query.filter_by(_id=id).first()

    def submission_add(self,submission):
        self.db.session.add(submission)
        self.db.session.commit()
        return submission
    
    def contest_add(self, contest):
        self.db.session.add(contest)
        self.db.session.commit()
        return contest

    def get_contests_page(self, index, page_size):
        return self.db.paginate(self.db.select(Contest))
    
    def submission_get_page(self, index, page_size):
        return self.db.paginate(self.db.select(Submission))
    
    def contest_update(self, id, updated_contest):
        contest = Contest.query.filter_by(_id=id).first()
        contest.name=updated_contest.name
        contest.task=updated_contest.task
        contest.max_participants_count=updated_contest.max_participants_count
        contest.start_time=updated_contest.start_time
        contest.end_time=updated_contest.end_time
        self.db.session.commit()

    def get_model(self, submission_id):
        submission=self.db.session.query(Submission).filter(Submission._id == submission_id).one()
        return submission.binary_model
    
    def participant_add(self, user_id, contest_id):
        participant=Participant(user_id, contest_id)
        self.db.session.add(participant)
        self.db.session.commit()

    def get_user_submissions(self, user_id, contest_id):
        if user_id is not None:
            submissions=self.db.session.query(Submission).filter(and_(Submission.user_id==user_id, Submission.contest_id==contest_id)).order_by(desc(Submission.time))
        else :
            submissions=self.db.session.query(Submission).order_by(desc(Submission.time))
        return submissions

    #users code
    def add_user(self, user):
        self.db.session.add(user)
        self.db.session.commit()

    def get_user(self, id):
        try:
            user = self.db.session.query(User).filter(User._id == id).one()
            return user
        except Exception:
            return None

    def user_update(self, id, updated_user):
        user = User.query.filter_by(_id=id).first()
        if user is not None:
            if updated_user.username is not None:
                user.username = updated_user.username
            if updated_user.password is not None:
                user.password = updated_user.password
            if updated_user.is_active is not None:
                user.is_active = updated_user.is_active
            if updated_user.user_type is not None:
                user.user_type = updated_user.user_type
            self.db.session.commit()
    

    def user_remove(self, id):
        User.query.filter(User._id==id).delete()
        self.db.session.commit()

    def get_all_users(self, page=1, per_page=10):
        users_page = self.db.paginate(self.db.select(User))
        return users_page