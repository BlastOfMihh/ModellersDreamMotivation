from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from backhand import db

class Vote(db.Model):
    __tablename__ = "votes"
    user_id = Column(Integer, ForeignKey("users._id"), primary_key=True)
    to_user_id = Column(Integer, ForeignKey("users._id"), primary_key=True)
    contest_id = Column(Integer, ForeignKey("contests._id"), primary_key=True)
    grade = Column(Integer, nullable=False, default=0)

    def __init__(self, user_id, to_user_id, contest_id, grade):
        self.user_id = user_id
        self.to_user_id = to_user_id
        self.contest_id = contest_id
        self.grade = grade

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'to_user_id': self.to_user_id,
            'contest_id': self.contest_id,
            'grade': self.grade
        }