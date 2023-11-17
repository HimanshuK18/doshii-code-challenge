CREATE DATABASE doshii_members_rewards;

go
USE doshii_members_rewards;
go
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE members(
  member_id int NOT NULL IDENTITY PRIMARY KEY,
  email nvarchar(250) NOT NULL UNIQUE,
  first_name nvarchar(100) NULL,
  last_name nvarchar(100) NULL,
  creation_date DATETIME DEFAULT GETDATE(),
  update_date DATETIME DEFAULT GETDATE(),
  CONSTRAINT CHK_ValidEmail CHECK (email LIKE '%@%.%')
)
GO
-- Create Rewards table
CREATE TABLE rewards(
	reward_id int NOT NULL IDENTITY PRIMARY KEY,
	reward_name nvarchar(250) NOT NULL,
    reward_value smallint CHECK (reward_value BETWEEN 1 AND 999) NOT NULL,
    creation_date DATETIME DEFAULT GETDATE() NOT NULL,
    update_date DATETIME DEFAULT GETDATE() NOT NULL,
 ) 
GO
-- Create MemberRewards table for the many-to-many relationship
CREATE TABLE member_rewards(
    member_rewards_id int NOT NULL IDENTITY,
	member_id int NOT NULL,
	reward_id int NOT NULL,
    reward_active BIT NOT NULL,
    creation_date DATETIME DEFAULT GETDATE(),
    update_date DATETIME DEFAULT GETDATE()
    PRIMARY KEY CLUSTERED (member_id, reward_id, member_rewards_id),
    FOREIGN KEY (member_id) REFERENCES [members](member_id) ON DELETE CASCADE,
    FOREIGN KEY (reward_id) REFERENCES [rewards](reward_id)
 )
 GO

-- Create index on email for faster member retrieval
CREATE INDEX idx_members_id ON members(email,member_id);

-- Create index on reward_name for faster reward retrieval
CREATE INDEX idx_rewards ON rewards(reward_id);

CREATE INDEX idx_member_rewards ON member_rewards(member_id, reward_id);

GO
CREATE TRIGGER trg_Members_UpdateDate
ON members
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF UPDATE(update_date)
    BEGIN
        RETURN;
    END

    UPDATE members
    SET update_date = GETDATE()
    FROM members
    JOIN inserted
    ON members.member_id = inserted.member_id;
END

GO
CREATE TRIGGER trg_Rewards_UpdateDate
ON rewards
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF UPDATE(update_date)
    BEGIN
        RETURN;
    END

    UPDATE rewards
    SET update_date = GETDATE()
    FROM rewards
    JOIN inserted
	 ON rewards.reward_id = inserted.reward_id;
END


GO
CREATE TRIGGER trg_Members_Rewards_UpdateDate
ON member_rewards
AFTER UPDATE
AS
BEGIN
    SET NOCOUNT ON;

    IF UPDATE(update_date)
    BEGIN
        RETURN;
    END

    UPDATE member_rewards
    SET update_date = GETDATE()
    FROM member_rewards
    JOIN inserted
	 ON member_rewards.member_rewards_id = inserted.member_rewards_id;
END

GO
INSERT INTO dbo.members (email,first_name,last_name)VALUES('mike.smith@wer.copm','Mike','Smith')
INSERT INTO dbo.members (email,first_name,last_name)VALUES('mary.jone@wer.copm','Mary','Jone')
INSERT INTO dbo.members (email,first_name,last_name)VALUES('a.kumar@top.copm','Amit','Kumar')

GO
INSERT INTO dbo.rewards (reward_name,reward_value) VALUES ('Christmas Sale',221)
INSERT INTO dbo.rewards (reward_name,reward_value) VALUES ('Black Friday Sale',122)
INSERT INTO dbo.rewards (reward_name,reward_value) VALUES ('New Year Sale',50)

GO
INSERT INTO dbo.member_rewards(member_id,reward_id,reward_active)VALUES(1,1,1)
INSERT INTO dbo.member_rewards(member_id,reward_id,reward_active)VALUES(1,2,1)
INSERT INTO dbo.member_rewards(member_id,reward_id,reward_active)VALUES(1,3,0)
INSERT INTO dbo.member_rewards(member_id,reward_id,reward_active)VALUES(2,1,1)
INSERT INTO dbo.member_rewards(member_id,reward_id,reward_active)VALUES(2,2,1)
INSERT INTO dbo.member_rewards(member_id,reward_id,reward_active)VALUES(2,3,0)
INSERT INTO dbo.member_rewards(member_id,reward_id,reward_active)VALUES(3,2,1)
INSERT INTO dbo.member_rewards(member_id,reward_id,reward_active)VALUES(3,1,0)
INSERT INTO dbo.member_rewards(member_id,reward_id,reward_active)VALUES(3,3,1)