package com.sonar;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;

import alex.iamandi.SonarMonitoringTool.Metric;
import alex.iamandi.SonarMonitoringTool.Project;


/**
 * QProject is a Querydsl query type for Project
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QProject extends EntityPathBase<Project> {

    private static final long serialVersionUID = -555076703L;

    public static final QProject project = new QProject("project");

    public final StringPath creationDate = createString("creationDate");

    public final StringPath date = createString("date");

    public final StringPath description = createString("description");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath key = createString("key");

    public final StringPath lname = createString("lname");

    public final SetPath<Metric, QMetric> msr = this.<Metric, QMetric>createSet("msr", Metric.class, QMetric.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final StringPath qualifier = createString("qualifier");

    public final StringPath scope = createString("scope");

    public final StringPath url = createString("url");

    public final StringPath uuid = createString("uuid");

    public final StringPath version = createString("version");

    public QProject(String variable) {
        super(Project.class, forVariable(variable));
    }

    public QProject(Path<? extends Project> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProject(PathMetadata<?> metadata) {
        super(Project.class, metadata);
    }

}

