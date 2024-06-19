from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from backhand import db

class Participant(db.Model):
    __tablename__ = "participants"
    user_id = Column(Integer, ForeignKey("users._id"), primary_key=True)
    contest_id = Column(Integer, ForeignKey("contests._id"), primary_key=True)
    points = Column(Integer, nullable=False, default=0)

    # user = relationship("User", back_populates="submissions")
    # contest = relationship("Contest", back_populates="submissions")
    
    def __init__(self, user_id, contest_id):
        self.user_id=user_id
        self.contest_id=contest_id

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'contest_id': self.contest_id,
            'points': self.points
        }